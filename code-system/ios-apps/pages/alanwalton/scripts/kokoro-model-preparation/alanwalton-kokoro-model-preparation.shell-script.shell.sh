#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_KOKORO'
    // MARK: - JS methods

    @objc func prepare(_ call: CAPPluginCall) {
        notifyListeners("waiting", data: [:])
        Task {
            do {
                try self.activateAudioSession()
                let mgr = self.manager ?? KokoroAneManager(variant: .english, defaultVoice: "af_heart")
                self.manager = mgr
                if !self.prepared {
                    try await self.runPrepare(mgr)
                    self.prepared = true
                }
                call.resolve(["ready": true])
            } catch {
                // Any failure — a stalled/failed download, a hung CoreML load, or
                // the deadline below — REJECTS so the JS transport degrades to the
                // web /stream fallback (#15702) instead of hanging at "generating
                // audio" forever (Reliability: loud failure over silent stall).
                self.notifyListeners("error", data: ["message": "prepare failed: \(error.localizedDescription)"])
                call.reject("prepare failed: \(error.localizedDescription)")
            }
        }
    }

    // Bounded, progress-reporting model preparation (#15702). The cold first-run
    // is a 75-file (~80–300 MB) HuggingFace download + a CoreML load/compile tail
    // — 60–90s+ that FluidAudio's `initialize()` runs SILENTLY (it accepts no
    // progress handler) and UNBOUNDED. On device that silence + a stalled fetch
    // read as an indefinite hang. This wraps it so: (1) real byte-level download
    // progress is forwarded as `downloadProgress` events — FluidAudio's OWN handler,
    // which `initialize()` drops, so we drive the idempotent downloader directly
    // first; `initialize()` then finds the files present and only loads/compiles;
    // (2) a heartbeat keeps the JS stall-watchdog alive across the un-instrumented
    // compile tail; (3) a deadline converts a genuine wedge into a rejection.
    private func runPrepare(_ mgr: KokoroAneManager) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            group.addTask { [weak self] in
                guard let self else { return }
                // Model download — forward FluidAudio's byte-level fraction as the
                // first 0 → 0.9 of the bar. Idempotent: skips if already cached, so a
                // bounded retry resumes from a transient drop rather than restarting.
                try await self.withDownloadRetry {
                    _ = try await KokoroAneResourceDownloader.ensureModels(
                        variant: .english, directory: nil
                    ) { p in self.emitDownloadProgress(p.fractionCompleted * 0.9) }
                }
                // English G2P assets — small; advance the bar 0.9 → 0.98.
                try await self.withDownloadRetry {
                    try await KokoroAneResourceDownloader.ensureG2PAssets(directory: nil) { p in
                        self.emitDownloadProgress(0.9 + p.fractionCompleted * 0.08)
                    }
                }
                // CoreML load/compile tail — no FluidAudio progress signal exists,
                // so emit a ~0.98 heartbeat every 2s to keep the JS stall-watchdog
                // from false-firing during this legitimately-silent phase; the
                // deadline task is this phase's actual hang-catch.
                let heartbeat = Task { [weak self] in
                    while !Task.isCancelled {
                        try? await Task.sleep(nanoseconds: 2_000_000_000)
                        if Task.isCancelled { return }
                        self?.emitDownloadProgress(0.98)
                    }
                }
                defer { heartbeat.cancel() }
                try await mgr.initialize()
            }
            group.addTask {
                try await Task.sleep(nanoseconds: KokoroTtsPlugin.prepareDeadlineNanos)
                throw KokoroTtsError.prepareTimedOut
            }
            // First to finish (preparation success, a download/compile error, or
            // the deadline) wins; cancel the loser and rethrow any error.
            try await group.next()
            group.cancelAll()
        }
    }

    // Run a network download with bounded exponential-backoff retry (#15740). Each
    // attempt is idempotent (FluidAudio skips already-fetched files), so a retry
    // RESUMES rather than restarts. Cancellation (the deadline task / a track change
    // firing group.cancelAll()) propagates immediately — never retried. After the
    // last attempt the error re-throws, so a persistent failure still degrades via
    // the JS surfaced-error path (#15739) rather than looping forever.
    private func withDownloadRetry(_ op: () async throws -> Void) async throws {
        var attempt = 1
        while true {
            do {
                try await op()
                return
            } catch {
                if Task.isCancelled || attempt >= KokoroTtsPlugin.downloadMaxAttempts { throw error }
                // Backoff 1s → 2s → 4s. A cancellation during the wait throws and
                // propagates (Task.sleep is cancellation-aware), aborting the retry.
                let backoffNanos = UInt64(1_000_000_000) << UInt64(attempt - 1)
                try await Task.sleep(nanoseconds: backoffNanos)
                attempt += 1
            }
        }
    }

    // Forward a [0,1] preparation fraction to JS as a `downloadProgress` event.
    // The payload matches the strict JS shape exactly ({received,total}) — do
    // not add fields, or the boundary Zod parse drops the event (progress + the
    // watchdog kick both silently lost). Hops to main (handler runs off-thread).
    private func emitDownloadProgress(_ fraction: Double) {
        let clamped = max(0, min(1, fraction))
        DispatchQueue.main.async {
            self.notifyListeners(
                "downloadProgress", data: ["received": Int(clamped * 1000), "total": 1000])
        }
    }

SWIFT_KOKORO
