#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names
# the seam set and is not a program of its own.
cat >> "$APPDELEGATE" <<'SWIFT_LAST_PLACE'

// ===== last-place seam ======================================================
// The alanwalton.com address the web view last showed, kept so a cold launch
// opens there rather than at /home. iOS ends a sleeping app without notice, so the
// address is written each time the web view moves rather than when the app closes.
//
// load() watches the web view's url, which also moves on the page's own history
// pushes. An address is kept only where it is https on alanwalton.com or one of its
// subdomains, and not a sign-in, sign-up, sign-out, handover or api address, so a
// launch never lands on a screen that only makes sense mid-sign-in.
//
// saved() answers { url } with the address kept, or {} where none is. The launch
// page in www asks for it before leaving for the live site.
//
// Surfaces on the JS bridge as window.Capacitor.Plugins.LastPlace, and is
// registered by its @objc class name in packageClassList.
@objc(LastPlacePlugin)
public class LastPlacePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LastPlacePlugin"
    public let jsName = "LastPlace"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "saved", returnType: CAPPluginReturnPromise)
    ]

    private static let key = "lastPlace"
    private static let site = "alanwalton.com"
    private static let passed: Set<String> = ["/sign-in", "/sign-up", "/sign-out"]
    private static let passedUnder = ["/handover/", "/api/"]

    private var watching: NSKeyValueObservation?

    public override func load() {
        DispatchQueue.main.async { self.watch() }
    }

    private func watch() {
        guard let webView = bridge?.webView else {
            NSLog("[LastPlace] no web view to watch")
            return
        }
        watching = webView.observe(\.url, options: [.new]) { _, change in
            guard let url = change.newValue ?? nil, LastPlacePlugin.kept(url) else { return }
            UserDefaults.standard.set(url.absoluteString, forKey: LastPlacePlugin.key)
        }
    }

    private static func kept(_ url: URL) -> Bool {
        guard url.scheme == "https", let host = url.host?.lowercased() else { return false }
        guard host == site || host.hasSuffix("." + site) else { return false }
        let path = url.path
        if passed.contains(path) { return false }
        return !passedUnder.contains { path.hasPrefix($0) }
    }

    @objc func saved(_ call: CAPPluginCall) {
        if let url = UserDefaults.standard.string(forKey: LastPlacePlugin.key) {
            call.resolve(["url": url])
        } else {
            call.resolve([:])
        }
    }
}
SWIFT_LAST_PLACE
echo "OK: appended LastPlacePlugin to $APPDELEGATE"
