import AppIntents
import SwiftUI
import WidgetKit

// A TAP ON A WIDGET OPENS THE APP ON A LINK NAMING THE WIDGET AND THAT ONE TAP.
//
// A link a widget's view carries is drawn into the widget's entry, and iOS hands over that same
// link on every tap until the entry reloads, so no id drawn into the view parts two taps on one
// entry. A button's intent is run afresh on every tap. iOS runs an intent that opens the app in
// the app rather than here, so the app's own copy of this intent makes the tap's id and hands the
// link on, and this copy names the intent the button runs. A tap on the widget's margin outside
// the button opens the link the view carries, which names no tap.
struct OpenWidgetTapLink: AppIntent {
    static var title: LocalizedStringResource = "Open a widget's link"
    static var isDiscoverable = false
    static var openAppWhenRun = true

    @Parameter(title: "Link") var link: String

    init() {}

    init(link: String) {
        self.link = link
    }

    func perform() async throws -> some IntentResult {
        .result()
    }
}

struct WidgetTapLinking: ViewModifier {
    let link: String

    func body(content: Content) -> some View {
        Button(intent: OpenWidgetTapLink(link: link)) {
            content
        }
        .buttonStyle(.plain)
        .widgetURL(URL(string: link))
    }
}

extension View {
    func widgetTapLink(_ link: String) -> some View {
        modifier(WidgetTapLinking(link: link))
    }
}
