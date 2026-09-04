import SwiftUI
import WidgetKit

enum SafetyLevelFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/safety-level")!

    static let previewPayload = SafetyLevelResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .yellow, reading: "2.5", nextTier: .green, progress: 0.50,
                label: "Safety"
            )
        ]
    )
}

struct SafetyLevelHomeView: View {
    let entry: FeedEntry<SafetyLevelResponse>

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
                    "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c"
            )
        )
    }

    private var safety: HabitStoplight? { safetyReading(entry.state) }

    private var ring: some View {
        SafetyRing(
            tier: safety?.tier,
            reading: safety?.reading,
            caption: safetyCaption(entry.state),
            nextTier: safety?.nextTier,
            progress: safety?.progress
        )
    }
}

struct SafetyLevelWidget: Widget {
    let kind = "SafetyLevelWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<SafetyLevelFeed>()) { entry in
            SafetyLevelHomeView(entry: entry)
        }
        .configurationDisplayName("Safety")
        .description("Where your safety level stands today.")
        .supportedFamilies([.systemSmall])
    }
}
