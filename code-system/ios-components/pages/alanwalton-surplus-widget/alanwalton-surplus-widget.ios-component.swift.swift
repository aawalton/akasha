import SwiftUI
import WidgetKit

enum SurplusFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/surplus")!

    static let previewPayload = SurplusResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .green, reading: "1.2", nextTier: .blue, progress: 0.30,
                label: "Surplus"
            )
        ]
    )
}

struct SurplusHomeView: View {
    let entry: FeedEntry<SurplusResponse>

    var body: some View {
        Group {
            switch entry.state {
            case .refused:
                RefusedView()
            case .neverLoaded:
                NeverLoadedView()
            case .loaded:
                ring
                    .padding(LARGE_RING_TILE_PADDING)
                    .containerBackground(for: .widget) { Color(.systemBackground) }
            }
        }
        .widgetURL(
            URL(
                string:
                    "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1"
            )
        )
    }

    private var surplus: HabitStoplight? { surplusReading(entry.state) }

    private var ring: some View {
        SurplusRing(
            tier: surplus?.tier,
            reading: surplus?.reading,
            caption: surplusCaption(entry.state),
            nextTier: surplus?.nextTier,
            progress: surplus?.progress
        )
    }
}

struct SurplusWidget: Widget {
    let kind = "SurplusWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<SurplusFeed>()) { entry in
            SurplusHomeView(entry: entry)
        }
        .configurationDisplayName("Surplus")
        .description("Hours of sleep left after what your day cost.")
        .supportedFamilies([.systemSmall])
    }
}
