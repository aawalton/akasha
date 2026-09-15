#!/usr/bin/env bash

if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_KOKORO'
    // MARK: - Synthesis loop

    // Serial producer: synthesize sentence chunks AHEAD of the playhead, keeping a
    // bounded number of scheduled-but-unplayed buffers so memory stays flat on a
    // multi-hour chapter (no whole-chapter buffering). Each scheduled buffer's
    // completion advances played time + emits progress; the final one emits ended.
    private func startSynthLoop(from startIndex: Int) {
        let lookahead = 3
        synthTask = Task { [weak self] in
            guard let self else { return }
            let all = self.stateQueue.sync { self.chunks }
            guard let mgr = self.manager else {
                // `startChapter` ran before a successful `prepare()` (the manager is
                // created there). Returning silently left the plugin asserting
                // playing/generating over an engine it had stopped driving — the state
                // `resume()` then aborted on, and the "nothing happens" the user saw
                // (#15906). Stop claiming playback and say so.
                self.stateQueue.sync {
                    self.isGenerating = false
                    self.isPausedFlag = true
                }
                self.notifyListeners("error", data: ["message": "voice not prepared"])
                return
            }
            var scheduledAhead = 0
            let aheadQueue = DispatchQueue(label: "kokoro-tts.ahead")
            for index in startIndex..<all.count {
                if Task.isCancelled { return }
                // Throttle: wait until the playhead has drained some lookahead.
                while aheadQueue.sync(execute: { scheduledAhead }) >= lookahead {
                    if Task.isCancelled { return }
                    try? await Task.sleep(nanoseconds: 60_000_000)
                }
                let speed = self.stateQueue.sync { self.rate }
                let result: KokoroAneSynthesisResult
                do {
                    result = try await mgr.synthesizeDetailed(text: all[index], speed: speed)
                } catch {
                    self.notifyListeners(
                        "error", data: ["message": "synthesis failed: \(error.localizedDescription)"])
                    return
                }
                if Task.isCancelled { return }
                let duration = result.durationSeconds
                self.stateQueue.sync {
                    self.synthesizedSeconds += duration
                    self.synthesizedChunks += 1
                }
                guard let buffer = Self.makeBuffer(from: result.samples, format: self.pcmFormat) else {
                    continue
                }
                let isLast = index == all.count - 1
                aheadQueue.sync { scheduledAhead += 1 }
                await MainActor.run {
                    if !self.engine.isRunning { self.prepareEngineIfNeeded() }
                    self.player.scheduleBuffer(buffer, completionCallbackType: .dataPlayedBack) { _ in
                        aheadQueue.sync { scheduledAhead -= 1 }
                        self.stateQueue.sync { self.playedSeconds += duration }
                        self.emitProgress()
                        if isLast { self.notifyListeners("ended", data: [:]) }
                    }
                    if !self.playbackStarted {
                        self.playbackStarted = true
                        self.player.play()
                        self.stateQueue.sync { self.isPausedFlag = false }
                        self.notifyListeners("playing", data: [:])
                        self.updateNowPlaying()
                    }
                }
            }
            self.stateQueue.sync { self.isGenerating = false }
        }
    }

    private func emitProgress() {
        let s = stateQueue.sync { () -> (played: Double, total: Double) in
            // Estimate total chapter seconds from the mean synthesized-chunk
            // duration × total chunk count, so positionFraction is stable before
            // every chunk is rendered; floor it at playedSeconds.
            let mean = self.synthesizedChunks > 0
                ? self.synthesizedSeconds / Double(self.synthesizedChunks) : 0
            let estimate = mean * Double(self.chunks.count)
            let total = max(estimate, self.playedSeconds)
            self.estimatedTotalSeconds = total
            return (played: self.playedSeconds, total: total)
        }
        let fraction = s.total > 0 ? min(1, s.played / s.total) : 0
        notifyListeners("progress", data: ["positionFraction": fraction, "playedSeconds": s.played])
        updateNowPlaying()
    }

    // MARK: - Engine / session

    private func prepareEngineIfNeeded() {
        if engine.attachedNodes.contains(player) == false {
            engine.attach(player)
            engine.connect(player, to: engine.mainMixerNode, format: pcmFormat)
        }
        if !engine.isRunning { try? engine.start() }
    }

    private func activateAudioSession() throws {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playback, mode: .spokenAudio, options: [])
        try session.setActive(true, options: [])
    }

    private func stopInternal() {
        synthTask?.cancel()
        synthTask = nil
        DispatchQueue.main.async {
            self.player.stop()
            self.engine.stop()
        }
        stateQueue.sync {
            self.isPausedFlag = true
            self.isGenerating = false
            self.playbackStarted = false
        }
    }

    private static func makeBuffer(from samples: [Float], format: AVAudioFormat) -> AVAudioPCMBuffer? {
        guard !samples.isEmpty,
            let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: AVAudioFrameCount(samples.count)),
            let channel = buffer.floatChannelData
        else { return nil }
        buffer.frameLength = AVAudioFrameCount(samples.count)
        samples.withUnsafeBufferPointer { src in
            channel[0].update(from: src.baseAddress!, count: samples.count)
        }
        return buffer
    }

    // Split into sentence-ish chunks on terminal punctuation, keeping the mark.
    // Kokoro renders a sentence cleanly; a chunk that is still very long is left
    // to FluidAudio's internal phoneme chunker.
    private static func splitSentences(_ text: String) -> [String] {
        var out: [String] = []
        var current = ""
        for ch in text {
            current.append(ch)
            if ch == "." || ch == "!" || ch == "?" || ch == "\n" {
                let trimmed = current.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty { out.append(trimmed) }
                current = ""
            }
        }
        let tail = current.trimmingCharacters(in: .whitespacesAndNewlines)
        if !tail.isEmpty { out.append(tail) }
        return out
    }

    // MARK: - Lock-screen / remote transport

    private var remoteCommandsInstalled = false
    private func setupRemoteCommands() {
        if remoteCommandsInstalled { return }
        remoteCommandsInstalled = true
        let center = MPRemoteCommandCenter.shared()
        center.playCommand.addTarget { [weak self] _ in
            self?.resumeInternal()
            return .success
        }
        center.pauseCommand.addTarget { [weak self] _ in
            self?.pauseInternal()
            return .success
        }
    }

    private func updateNowPlaying() {
        let s = stateQueue.sync {
            (played: self.playedSeconds, total: self.estimatedTotalSeconds, paused: self.isPausedFlag)
        }
        let info: [String: Any] = [
            MPMediaItemPropertyTitle: "Chapter narration",
            MPNowPlayingInfoPropertyElapsedPlaybackTime: s.played,
            MPMediaItemPropertyPlaybackDuration: max(s.total, s.played),
            MPNowPlayingInfoPropertyPlaybackRate: s.paused ? 0.0 : 1.0,
        ]
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
    }
}
SWIFT_KOKORO
echo "OK: appended KokoroTtsPlugin seam to $APPDELEGATE"
else
echo "OK: KokoroTts seam disabled (NATIVE_SHELL_KOKORO_TTS=0) — no Swift appended"
fi
