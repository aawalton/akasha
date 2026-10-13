import SwiftUI
import WidgetKit

enum ConnectionFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/connection")!

    static let previewPayload = SafetyLevelResponse(
        stoplights: [
            HabitStoplight(
                habit: "connection", tier: .yellow, reading: "0.75", nextTier: .green,
                progress: 0.50, label: "Connection", figureOffScale: true
            )
        ]
    )
}

private struct ConnectionRefused: View {
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

private struct ConnectionNeverLoaded: View {
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

struct ConnectionHomeView: View {
    let entry: FeedEntry<SafetyLevelResponse>

    var body: some View {
        content
            .padding(LARGE_RING_TILE_PADDING)
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var content: some View {
        switch entry.state {
        case .refused:
            ConnectionRefused()
        case .neverLoaded:
            ConnectionNeverLoaded()
        case .loaded:
            ring
        }
    }

    private var ring: some View {
        let connection = safetyReading(entry.state)
        return SafetyRing(
            tier: connection?.tier,
            reading: connection?.reading,
            caption: safetyCaption(entry.state),
            nextTier: connection?.nextTier,
            progress: connection?.progress,
            figureOffScale: connection?.figureOffScale ?? false,
            noSignal: safetyNoSignal(entry.state)
        )
    }
}

struct ConnectionWidget: Widget {
    let kind = "ConnectionWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<ConnectionFeed>(kind: kind)) {
            entry in
            ConnectionHomeView(entry: entry)
        }
        .configurationDisplayName("Connection")
        .description("How much of Alan's day was spent at ease with you.")
        .supportedFamilies([.systemSmall])
    }
}
