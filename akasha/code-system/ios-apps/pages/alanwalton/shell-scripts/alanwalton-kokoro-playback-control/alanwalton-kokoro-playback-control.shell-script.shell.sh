#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_KOKORO'
    @objc func startChapter(_ call: CAPPluginCall) {
        guard let text = call.getString("text"), !text.isEmpty else {
            call.reject("startChapter() requires non-empty 'text'")
            return
        }
        let chapter = call.getString("chapterId") ?? ""
        let startFraction = call.getDouble("startFraction") ?? 0
        if let r = call.getFloat("rate") { self.rate = r }

        // Reset engine + state for the new chapter, then start the synth loop.
        self.stopInternal()
        let sentences = Self.splitSentences(text)
        let startIndex = sentences.isEmpty
            ? 0 : min(sentences.count - 1, Int(startFraction * Double(sentences.count)))
        stateQueue.sync {
            self.chapterId = chapter
            self.chunks = sentences
            self.playedSeconds = 0
            self.synthesizedSeconds = 0
            self.synthesizedChunks = 0
            self.estimatedTotalSeconds = 0
            self.playbackStarted = false
            self.isPausedFlag = false
            self.isGenerating = true
        }
        notifyListeners("waiting", data: [:])
        self.startSynthLoop(from: startIndex)
        self.setupRemoteCommands()
        call.resolve()
    }

    @objc func pause(_ call: CAPPluginCall) {
        pauseInternal()
        call.resolve()
    }

    @objc func resume(_ call: CAPPluginCall) {
        resumeInternal()
        call.resolve()
    }

    private func pauseInternal() {
        DispatchQueue.main.async {
            self.player.pause()
            self.stateQueue.sync { self.isPausedFlag = true }
            self.updateNowPlaying()
        }
    }

    private func resumeInternal() {
        DispatchQueue.main.async {
            // `engine.start()` RAISES AN OBJ-C NSException on an empty graph
            // ("required condition is false: inputNode != nullptr || outputNode !=
            // nullptr"). Swift's `try?` catches only Swift errors, so the `try?` below
            // is camouflage rather than protection and the exception aborts the process
            // (#15906 SIGABRT). `player` is attached only by `prepareEngineIfNeeded`,
            // from the synth loop, so a resume arriving before the first rendered
            // sentence must not touch the engine. Guarding here covers BOTH callers —
            // the JS `resume()` bridge and the lock-screen `playCommand` target.
            guard self.engine.attachedNodes.contains(self.player) else {
                self.notifyListeners("error", data: ["message": "resume before playback started"])
                return
            }
            if !self.engine.isRunning { try? self.engine.start() }
            self.player.play()
            self.stateQueue.sync { self.isPausedFlag = false }
            self.notifyListeners("playing", data: [:])
            self.updateNowPlaying()
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        self.stopInternal()
        call.resolve()
    }

    @objc func seek(_ call: CAPPluginCall) {
        let fraction = call.getDouble("fraction") ?? 0
        let count = stateQueue.sync { self.chunks.count }
        guard count > 0 else { call.resolve(); return }
        let target = max(0, min(count - 1, Int(fraction * Double(count))))
        // Re-seed the synth loop at the target sentence: stop current playback,
        // reset played bookkeeping proportionally, restart from `target`.
        self.synthTask?.cancel()
        DispatchQueue.main.async {
            self.player.stop()
            self.stateQueue.sync {
                self.playedSeconds = fraction * self.estimatedTotalSeconds
                self.synthesizedSeconds = self.playedSeconds
                self.playbackStarted = false
                self.isPausedFlag = false
            }
            self.startSynthLoop(from: target)
            call.resolve()
        }
    }

    @objc func setRate(_ call: CAPPluginCall) {
        if let r = call.getFloat("rate") { stateQueue.sync { self.rate = r } }
        call.resolve()
    }

    @objc func getState(_ call: CAPPluginCall) {
        let s = stateQueue.sync {
            (paused: self.isPausedFlag, gen: self.isGenerating, played: self.playedSeconds,
             total: self.estimatedTotalSeconds)
        }
        let fraction = s.total > 0 ? s.played / s.total : 0
        call.resolve([
            "playing": !s.paused, "paused": s.paused, "positionFraction": fraction,
            "ready": self.prepared, "generating": s.gen,
        ])
    }

SWIFT_KOKORO
