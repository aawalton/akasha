import SwiftUI
import WidgetKit

enum SurplusFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/surplus")!

    static let previewPayload = SurplusResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .green, reading: "1.2", nextTier: .blue,
                progress: 0.30, label: "Alan's Surplus"
            )
        ]
    )
}

private struct SurplusRefused: View {
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

private struct SurplusNeverLoaded: View {
    var body: some View {
        VStack(spacing: SPACING_1_5) {
            Image(systemName: "wifi.slash")
                .font(.system(size: 30, weight: .semibold))
            Text("No signal")
                .font(.system(size: 12, weight: .medium))
        }
        .foregroundStyle(.secondary)
    }
}

struct SurplusHomeView: View {
    let entry: FeedEntry<SurplusResponse>

    var body: some View {
        content
            .padding(LARGE_RING_TILE_PADDING)
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var content: some View {
        switch entry.state {
        case .refused:
            SurplusRefused()
        case .neverLoaded:
            SurplusNeverLoaded()
        case .loaded:
            ring
        }
    }

    private var ring: some View {
        let surplus = surplusReading(entry.state)
        return SurplusRing(
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
        .description("Hours of sleep left after what Alan's day cost.")
        .supportedFamilies([.systemSmall])
    }
}
