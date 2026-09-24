#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names the seam
# set and is not a program of its own. The widget extension's copy of this intent is the
# widget-tap-link ios-component.

cat >> "$APPDELEGATE" <<'SWIFT_WIDGET_TAP_INTENT'

// ===== widget tap intent seam ================================================
// The intent a tap on a widget runs. It opens the app, so iOS runs it here rather than in the
// widget extension, once for every tap. The tap's id is made here, and the widget's link is
// handed on naming it, as a link the app is opened by is handed on.
struct OpenWidgetTapLink: AppIntent {
    static var title: LocalizedStringResource = "Open a widget's link"
    static var isDiscoverable = false
    static var openAppWhenRun = true

    @Parameter(title: "Link") var link: String

    init() {}

    init(link: String) {
        self.link = link
    }

    @MainActor
    func perform() async throws -> some IntentResult {
        guard var parts = URLComponents(string: link) else { return .result() }
        let named = "tap=\(UUID().uuidString.lowercased())"
        parts.fragment = parts.fragment.map { "\($0)&\(named)" } ?? named
        if let tapped = parts.url {
            _ = ApplicationDelegateProxy.shared.application(
                UIApplication.shared, open: tapped, options: [:])
        }
        return .result()
    }
}
SWIFT_WIDGET_TAP_INTENT
echo "OK: appended OpenWidgetTapLink to $APPDELEGATE"
