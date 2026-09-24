import SwiftUI
import WidgetKit

enum CategorizationFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/categorization")!

    static let previewPayload = Categorization(
        unreviewed: 19, label: "Unreviewed", unit: "transactions")
}

struct CategorizeHomeView: View {
    let entry: FeedEntry<Categorization>

    var body: some View {
        if case .refused = entry.state {
            RefusedView()
        } else {
            CategorizeTile(reading: categorizeReading(entry.state))
                .padding(LARGE_RING_TILE_PADDING)
                .containerBackground(for: .widget) { Color(.systemBackground) }
                .widgetURL(URL(string: "capacitor://monarch-relay#widget=alanwalton-categorize"))
        }
    }
}

struct CategorizeWidget: Widget {
    let kind = "CategorizeWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<CategorizationFeed>(kind: kind)) {
            entry in
            CategorizeHomeView(entry: entry)
        }
        .configurationDisplayName("Left to Review")
        .description("How many of the past year's transactions Monarch is waiting to have reviewed.")
        .supportedFamilies([.systemSmall])
    }
}
