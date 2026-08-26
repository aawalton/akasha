#!/usr/bin/env bash

insert_import_after_capacitor() {
  local framework="$1"
  if ! grep -q "^import ${framework}\$" "$APPDELEGATE"; then
    awk -v imp="import ${framework}" '
      { print }
      /^import Capacitor/ && !done { print imp; done = 1 }
    ' "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
    mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
    echo "OK: added 'import ${framework}' to $APPDELEGATE"
  fi
}
remove_import() {
  local framework="$1"
  if grep -q "^import ${framework}\$" "$APPDELEGATE"; then
    grep -v "^import ${framework}\$" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
    mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
    echo "OK: removed 'import ${framework}' from $APPDELEGATE"
  fi
}
insert_import_after_capacitor AVFoundation
insert_import_after_capacitor WebKit
insert_import_after_capacitor MetricKit
insert_import_after_capacitor WidgetKit
insert_import_after_capacitor UserNotifications
insert_import_after_capacitor AppIntents
insert_import_after_capacitor Network
insert_import_after_capacitor UniformTypeIdentifiers
insert_import_after_capacitor Security
insert_import_after_capacitor CryptoKit
insert_import_after_capacitor HealthKit
if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
  insert_import_after_capacitor FluidAudio
  insert_import_after_capacitor MediaPlayer
else
  remove_import FluidAudio
  remove_import MediaPlayer
fi

CRASH_MARKER='// ===== native crash-capture seam'
SHIM_MARKER='// ===== offline-audio native playback shim'
ACCESSORY_MARKER='// ===== keyboard-accessory suppressor seam'
WIDGET_REFRESH_MARKER='// ===== widget-refresh-on-foreground seam'
KOKORO_MARKER='// ===== kokoro-tts on-device synthesis seam'
WALLPAPER_INTENT_MARKER='// ===== get-wallpaper app intent seam'
ACTIVE_ENERGY_INTENT_MARKER='// ===== sync-active-energy app intent seam'
HEALTH_SAMPLES_INTENT_MARKER='// ===== stream-health-samples app intent seam'
APP_SHORTCUTS_PROVIDER_MARKER='// ===== app shortcuts provider seam'
DEVICE_SECRET_MARKER='// ===== device-secret keychain seam'
MONARCH_TAP_MARKER='// ===== monarch-tap relay seam'
BUILD_STAMP_MARKER='// ===== build stamp seam'
FIRST_SEAM_LINE=$(grep -nF -e "$CRASH_MARKER" -e "$SHIM_MARKER" -e "$ACCESSORY_MARKER" -e "$WIDGET_REFRESH_MARKER" -e "$KOKORO_MARKER" -e "$WALLPAPER_INTENT_MARKER" -e "$ACTIVE_ENERGY_INTENT_MARKER" -e "$HEALTH_SAMPLES_INTENT_MARKER" -e "$APP_SHORTCUTS_PROVIDER_MARKER" -e "$DEVICE_SECRET_MARKER" -e "$MONARCH_TAP_MARKER" -e "$BUILD_STAMP_MARKER" "$APPDELEGATE" | head -1 | cut -d: -f1 || true)
if [[ -n "$FIRST_SEAM_LINE" ]]; then
  head -n "$((FIRST_SEAM_LINE - 1))" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: stripped previously-applied seam classes from $APPDELEGATE"
fi
awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
  "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"

cat >> "$APPDELEGATE" <<'SWIFT_CRASH'

// ===== native crash-capture seam =============================================
// Reports native-shell failures into the web /api/errors sink so they land in
// error rows like web errors. A SECOND appended @objc plugin (own marker;
// registered in packageClassList below). Both paths POST the EXACT
// @shared/errors-core ErrorReport wire shape (the server parses with .strict(),
// so the body must carry ONLY those keys) with app="alanwalton-native". The web
// app keeps reporting in-page JS errors as app="alanwalton"; these two native
// kinds are only ever emitted here.

// Fire-and-forget POST of one ErrorReport. errorUserId is required-but-nullable
// (NSNull() → JSON null). No extra keys, or the server's .strict() parse rejects it.
private func crashCaptureReport(kind: String, message: String, stack: String, url: String) {
    guard let endpoint = URL(string: "https://alanwalton.com/api/errors") else { return }
    let device = "alanwalton-native-shell; iOS \(UIDevice.current.systemVersion); \(UIDevice.current.model)"
    let body: [String: Any] = [
        "message": String(message.prefix(2048)),
        "stack": String(stack.prefix(16384)),
        "kind": kind,
        "app": "alanwalton-native",
        "url": String(url.prefix(2048)),
        "userAgent": String(device.prefix(1024)),
        "errorUserId": NSNull(),
    ]
    guard let httpBody = try? JSONSerialization.data(withJSONObject: body) else { return }
    var request = URLRequest(url: endpoint)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = httpBody
    URLSession.shared.dataTask(with: request).resume()
}

// Reduce an MXCallStackTree to a STABLE top-frames signature for server-side
// dedup: binaryName + offsetIntoBinaryTextSegment (offset is ASLR-independent;
// the raw `address` is not), walking the attributed (crashing) thread down
// subFrames and taking the top 8 frames.
@available(iOS 14.0, *)
private func crashCaptureStackSignature(_ tree: MXCallStackTree) -> String {
    let data = tree.jsonRepresentation()
    guard
        let root = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any],
        let stacks = root["callStacks"] as? [[String: Any]]
    else { return "native-crash-unparsed" }
    let chosen = stacks.first(where: { ($0["threadAttributed"] as? Bool) == true }) ?? stacks.first
    guard let rootFrames = chosen?["callStackRootFrames"] as? [[String: Any]] else {
        return "native-crash-noframes"
    }
    var frames: [String] = []
    var current: [String: Any]? = rootFrames.first
    while let frame = current, frames.count < 8 {
        let name = (frame["binaryName"] as? String) ?? "?"
        let offset = (frame["offsetIntoBinaryTextSegment"] as? NSNumber)?.stringValue ?? "?"
        frames.append("\(name)+\(offset)")
        current = (frame["subFrames"] as? [[String: Any]])?.first
    }
    return frames.joined(separator: "\n")
}

// A WKNavigationDelegate proxy that intercepts WKWebView content-process
// termination to fire our POST, then forwards every OTHER navigation-delegate
// selector to Capacitor's real handler (Obj-C message forwarding), so Capacitor's
// own bridge.reset() + webView.reload() still runs — i.e. the auto-reload is
// preserved, we only add the report.
final class CrashCaptureNavProxy: NSObject, WKNavigationDelegate {
    private let target: WKNavigationDelegate
    init(target: WKNavigationDelegate) { self.target = target }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        crashCaptureReport(
            kind: "webview-process-terminated",
            message: "WKWebView content process terminated",
            stack: webView.url?.path ?? "",
            url: webView.url?.absoluteString ?? ""
        )
        target.webViewWebContentProcessDidTerminate?(webView)
    }

    override func responds(to aSelector: Selector!) -> Bool {
        super.responds(to: aSelector) || target.responds(to: aSelector)
    }
    override func forwardingTarget(for aSelector: Selector!) -> Any? { target }
}

// Registered in packageClassList → instantiated by Capacitor's bridge at launch,
// which calls load() with self.webView populated. No JS methods: this plugin
// exists only for its launch-time load() side effects.
@objc(CrashCapturePlugin)
public class CrashCapturePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CrashCapturePlugin"
    public let jsName = "CrashCapture"
    public let pluginMethods: [CAPPluginMethod] = []

    // Retained: navigationDelegate is a WEAK reference, so the proxy must be held
    // by the plugin (which the bridge retains for the app's lifetime).
    private var navProxy: CrashCaptureNavProxy?

    public override func load() {
        if let webView = self.webView, let capHandler = webView.navigationDelegate {
            let proxy = CrashCaptureNavProxy(target: capHandler)
            self.navProxy = proxy
            webView.navigationDelegate = proxy
        }
        if #available(iOS 14.0, *) {
            MXMetricManager.shared.add(self)
        }
    }
}

// MetricKit delivers crash diagnostics on the NEXT launch after a crash (never in
// the crashing session); POST each as kind="native-crash" with the stable
// call-stack signature in `stack` so the server fingerprint dedups per crash.
@available(iOS 14.0, *)
extension CrashCapturePlugin: MXMetricManagerSubscriber {
    public func didReceive(_ payloads: [MXDiagnosticPayload]) {
        for payload in payloads {
            for crash in (payload.crashDiagnostics ?? []) {
                let reason = crash.terminationReason ?? "native crash"
                let exceptionType = crash.exceptionType?.stringValue ?? "?"
                let signal = crash.signal?.stringValue ?? "?"
                crashCaptureReport(
                    kind: "native-crash",
                    message: "\(reason) (exceptionType=\(exceptionType) signal=\(signal))",
                    stack: crashCaptureStackSignature(crash.callStackTree),
                    url: ""
                )
            }
        }
    }
}
SWIFT_CRASH
echo "OK: appended CrashCapturePlugin to $APPDELEGATE"

cat >> "$APPDELEGATE" <<'SWIFT'

// ===== offline-audio native playback shim =====================================
// A Capacitor plugin that plays the DOWNLOADED LOCAL file via AVPlayer over an
// AVAudioSession in the .playback category. This is what the harness's "Play
// local file" button calls instead of the web <audio> element, which fails on
// the local file ("operation not supported"). AVPlayer reads the file:// URL
// directly and, with UIBackgroundModes=[audio], keeps playing screen-off.
//
// Surfaces on the JS bridge as window.Capacitor.Plugins.NativeAudio (the same
// path as the other native plugins). It is registered by adding the @objc class
// name to packageClassList in capacitor.config.json (done by this seam below).
@objc(NativeAudioPlugin)
public class NativeAudioPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NativeAudioPlugin"
    public let jsName = "NativeAudio"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "play", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    // Retained as properties so neither the player nor its item is deallocated
    // mid-playback (a GC'd local AVPlayer goes silent within milliseconds).
    private var player: AVPlayer?
    private var currentItem: AVPlayerItem?

    @objc func play(_ call: CAPPluginCall) {
        guard let uriString = call.getString("uri") else {
            call.reject("play() requires a 'uri' (file:// URL of the downloaded file)")
            return
        }
        // Build a CANONICAL file URL. For a LOCAL file use URL(fileURLWithPath:),
        // NOT URL(string: "file://…") — the string initializer silently yields a
        // player that produces no sound (and no error) when the path isn't fully
        // percent-encoded. Strip the file:// prefix and percent-decode to the raw
        // filesystem path that fileURLWithPath expects. (Iteration-1 used
        // URL(string:) and was audibly silent despite playing:true.)
        let raw = uriString.hasPrefix("file://")
            ? String(uriString.dropFirst("file://".count))
            : uriString
        let path = raw.removingPercentEncoding ?? raw
        let url = URL(fileURLWithPath: path)

        // Do the ENTIRE audio-session setup + player creation + play on the main
        // queue in strict order, so there is no cross-thread window between
        // activating the session and starting playback.
        DispatchQueue.main.async {
            let session = AVAudioSession.sharedInstance()
            do {
                try session.setCategory(.playback, mode: .default, options: [])
                try session.setActive(true, options: [])
                NSLog("[NativeAudio] session ACTIVE category=\(session.category.rawValue) outputVolume=\(session.outputVolume) route=\(session.currentRoute.outputs.map { $0.portType.rawValue })")
            } catch {
                NSLog("[NativeAudio] session activation FAILED: \(error.localizedDescription)")
                call.reject("AVAudioSession activation failed: \(error.localizedDescription)")
                return
            }

            let item = AVPlayerItem(url: url)
            self.currentItem = item
            if let player = self.player {
                player.replaceCurrentItem(with: item)
            } else {
                self.player = AVPlayer(playerItem: item)
            }
            // For a local file, do not let the player wait to "minimize stalling"
            // — start immediately — and make volume/mute explicit.
            self.player?.automaticallyWaitsToMinimizeStalling = false
            self.player?.volume = 1.0
            self.player?.isMuted = false

            let size = (try? FileManager.default.attributesOfItem(atPath: url.path))?[.size] as? Int ?? -1
            NSLog("[NativeAudio] play url=\(url.absoluteString) exists=\(FileManager.default.fileExists(atPath: url.path)) bytes=\(size)")
            self.player?.play()
            NSLog("[NativeAudio] post-play rate=\(self.player?.rate ?? -1)")

            // Diagnostic re-check: a silent failure shows here as status=2
            // (.failed, with itemErr set) or rate stuck at 0 — captured in the
            // Xcode console for the next iteration if audio is still absent.
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                let st = self.player?.currentItem?.status.rawValue ?? -99
                NSLog("[NativeAudio] +1s status=\(st) rate=\(self.player?.rate ?? -1) playerErr=\(String(describing: self.player?.error)) itemErr=\(String(describing: self.player?.currentItem?.error))")
            }

            call.resolve(["playing": true, "uri": uriString])
        }
    }

    @objc func pause(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.player?.pause()
            call.resolve()
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.player?.pause()
            self.player?.replaceCurrentItem(with: nil)
            self.currentItem = nil
            call.resolve()
        }
    }
}
SWIFT
echo "OK: appended NativeAudioPlugin shim to $APPDELEGATE"
