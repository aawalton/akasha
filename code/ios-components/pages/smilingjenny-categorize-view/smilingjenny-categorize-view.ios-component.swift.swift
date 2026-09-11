import SwiftUI
import WidgetKit

enum CategorizationFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/categorization")!

    static let previewPayload = Categorization(unreviewed: 19)
}

private struct CategorizeRefused: View {
    var body: some View {
        VStack(spacing: SPACING_1_5) {
            Image(systemName: "lock.slash")
                .font(.system(size: 30, weight: .semibold))
            Text("Update app")
                .font(.system(size: 12, weight: .medium))
                .minimumScaleFactor(0.6)
                .lineLimit(1)
        }
        .foregroundStyle(.secondary)
    }
}

struct CategorizeHomeView: View {
    let entry: FeedEntry<Categorization>

    var body: some View {
        content
            .padding(LARGE_RING_TILE_PADDING)
            .containerBackground(for: .widget) { Color(.systemBackground) }
            .widgetURL(MONARCH_RELAY_URL)
    }

    @ViewBuilder private var content: some View {
        if case .refused = entry.state {
            CategorizeRefused()
        } else {
            CategorizeTile(reading: categorizeReading(entry.state))
        }
    }
}
