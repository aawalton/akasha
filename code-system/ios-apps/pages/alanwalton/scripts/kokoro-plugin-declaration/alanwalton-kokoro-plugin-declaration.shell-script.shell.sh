#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_KOKORO'

// ===== kokoro-tts on-device synthesis seam ===================================
// On-device Kokoro-82M synthesis (FluidAudio KokoroAne, Apache-2.0, ANE) with
// PROGRESSIVE AVAudioEngine playback. The webview player (playing-session-context)
// selects this transport for the on-demand "kokoro" variant in the shell and
// bridges transport to these methods, sourcing progress/waiting/ended/error from
// the events emitted below. Kokoro is non-streaming PER call, so progressive
// start is achieved by chunking the chapter into sentences and synthesizing a
// bounded lookahead AHEAD of the playhead (synthesis clears ~4x realtime on the
// ANE, so it outruns playback) — only a few PCM buffers are ever resident.
// Preparation errors surfaced by the KokoroTts seam (#15702). `prepareTimedOut`
// is thrown by the deadline task so a genuine wedge rejects `prepare()` (→ JS
// catch → /stream fallback) rather than hanging.
enum KokoroTtsError: Error, LocalizedError {
    case prepareTimedOut
    var errorDescription: String? {
        switch self {
        case .prepareTimedOut: return "voice preparation timed out"
        }
    }
}

@objc(KokoroTtsPlugin)
public class KokoroTtsPlugin: CAPPlugin, CAPBridgedPlugin, @unchecked Sendable {
    public let identifier = "KokoroTtsPlugin"
    public let jsName = "KokoroTts"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "prepare", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startChapter", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resume", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "seek", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setRate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getState", returnType: CAPPluginReturnPromise),
    ]

    // FluidAudio manager (created lazily in prepare so the ~80–300MB model
    // download is gated on the user's first explicit play, never at app launch).
    private var manager: KokoroAneManager?
    private var prepared = false

    // Absolute ceiling on the whole prepare (download + CoreML load/compile). The
    // JS stall-watchdog (20s of event-silence) is the responsive, network-aware
    // backstop that fires the /stream fallback fast on a stalled fetch; this
    // native deadline is the coarse belt-and-suspenders that bounds a total wedge
    // (e.g. a hung CoreML compile the heartbeat masks from the JS side) and
    // unwinds the dangling task. Generous so a legitimately-slow-but-progressing
    // cold download is never aborted.
    static let prepareDeadlineNanos: UInt64 = 300 * 1_000_000_000

    // Bounded retry for the transient-drop-prone network downloads (#15740). The
    // 75-file model fetch previously died on the FIRST transient failure — a dropped
    // connection, a flaky file — rejecting the whole prepare() (Alan hit a ~20% death
    // on device, build 140). FluidAudio's ensureModels/ensureG2PAssets are idempotent
    // (already-fetched files are skipped), so a retry RESUMES from where the drop
    // died rather than restarting. Only the network downloads are retried; the local
    // CoreML load/compile is compute, bounded by the deadline above. A persistent
    // failure still rejects after the last attempt, so the JS surfaced-error +
    // /stream fallback (#15702/#15739) is unchanged for a truly-offline device.
    static let downloadMaxAttempts = 4

    // Progressive playback engine. `player` renders scheduled PCM buffers gaplessly.
    private let engine = AVAudioEngine()
    private let player = AVAudioPlayerNode()
    private let sampleRate: Double = 24_000
    private lazy var pcmFormat = AVAudioFormat(
        commonFormat: .pcmFormatFloat32, sampleRate: sampleRate, channels: 1, interleaved: false)!

    // Synthesis loop state. `synthTask` is the single serial producer; cancelling
    // it stops look-ahead synthesis. Access on `stateQueue`.
    private let stateQueue = DispatchQueue(label: "kokoro-tts.state")
    private var synthTask: Task<Void, Never>?
    private var chapterId = ""
    private var chunks: [String] = []
    private var rate: Float = 1.0
    private var isPausedFlag = true
    private var isGenerating = false
    // Duration bookkeeping for progress: total synthesized-so-far and played-so-far
    // seconds. positionFraction is playedSeconds / max(totalSynthesizedSeconds,
    // estimate) — an estimate that tightens as more chunks synthesize.
    private var playedSeconds: Double = 0
    private var synthesizedSeconds: Double = 0
    private var synthesizedChunks: Int = 0
    private var estimatedTotalSeconds: Double = 0
    private var playbackStarted = false

SWIFT_KOKORO
