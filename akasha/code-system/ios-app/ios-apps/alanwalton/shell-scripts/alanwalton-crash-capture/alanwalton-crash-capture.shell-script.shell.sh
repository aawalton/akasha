#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 02-webview-and-audio.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
cat >> "$APPDELEGATE" <<'SWIFT_CRASH'

// ===== native crash-capture seam =============================================
// Reports native-shell failures into the web /api/errors sink so they land in
// error rows like web errors. A SECOND appended @objc plugin (own marker;
// registered in packageClassList below). Both paths POST the EXACT
// @akasha/errors-core ErrorReport wire shape (the server parses with .strict(),
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
