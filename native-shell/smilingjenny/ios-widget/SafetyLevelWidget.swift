import SwiftUI
import WidgetKit

enum SafetyLevelFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/safety-level")!

    static let previewPayload = SafetyLevelResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .yellow, reading: "2.5", nextTier: .green,
                progress: 0.50, label: "Alan's Safety"
            )
        ]
    )
}

private struct SafetyRefused: View {
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

private struct SafetyNeverLoaded: View {
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

struct SafetyLevelHomeView: View {
    let entry: FeedEntry<SafetyLevelResponse>

    var body: some View {
        content
            .padding(LARGE_RING_TILE_PADDING)
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var content: some View {
        switch entry.state {
        case .refused:
            SafetyRefused()
        case .neverLoaded:
            SafetyNeverLoaded()
        case .loaded:
            ring
        }
    }

    private var ring: some View {
        let safety = safetyReading(entry.state)
        return SafetyRing(
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
        .description("Where Alan's safety level stands today.")
        .supportedFamilies([.systemSmall])
    }
}
