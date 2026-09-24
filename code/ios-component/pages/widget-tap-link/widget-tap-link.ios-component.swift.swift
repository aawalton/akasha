import AppIntents
import SwiftUI
import WidgetKit

// A TAP ON A WIDGET OPENS THE APP ON A LINK NAMING THE WIDGET AND THAT ONE TAP.
//
// A link a widget's view carries is drawn into the widget's entry, and iOS hands over that same
// link on every tap until the entry reloads, so no id drawn into the view parts two taps on one
// entry. A button's intent is run afresh on every tap, so the tap's id is made there and the link
// is opened from there. The app tells one tap arriving twice from two taps by that id.
//
// iOS lets an intent open a link from 18 on. An older phone opens the link the view carries,
// which names no tap, and so does a tap on the widget's margin outside the button.
enum WidgetTapLink {
    static let TAP = "tap"

    static func tapped(_ link: String, tap: String) -> URL? {
        guard var parts = URLComponents(string: link) else { return nil }
        let named = "\(TAP)=\(tap)"
        parts.fragment = parts.fragment.map { "\($0)&\(named)" } ?? named
        return parts.url
    }
}

struct UnreadableWidgetTapLink: Error {
    let link: String
}

@available(iOS 18.0, *)
struct OpenWidgetTapLink: AppIntent {
    static var title: LocalizedStringResource = "Open a widget's link"
    static var isDiscoverable = false

    @Parameter(title: "Link") var link: String

    init() {}

    init(link: String) {
        self.link = link
    }

    func perform() async throws -> some IntentResult & OpensIntent {
        guard let tapped = WidgetTapLink.tapped(link, tap: UUID().uuidString.lowercased()) else {
            throw UnreadableWidgetTapLink(link: link)
        }
        return .result(opensIntent: OpenURLIntent(tapped))
    }
}

struct WidgetTapLinking: ViewModifier {
    let link: String

    @ViewBuilder func body(content: Content) -> some View {
        if #available(iOS 18.0, *) {
            Button(intent: OpenWidgetTapLink(link: link)) {
                content
            }
            .buttonStyle(.plain)
            .widgetURL(URL(string: link))
        } else {
            content.widgetURL(URL(string: link))
        }
    }
}

extension View {
    func widgetTapLink(_ link: String) -> some View {
        modifier(WidgetTapLinking(link: link))
    }
}
