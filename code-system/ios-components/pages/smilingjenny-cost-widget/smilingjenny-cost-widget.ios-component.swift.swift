import SwiftUI
import WidgetKit

struct CostResponse: Decodable {
    let stoplights: [HabitStoplight]

    init(stoplights: [HabitStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([HabitStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one stoplight, got none"
            )
        }
        stoplights = decoded
    }

    var cost: HabitStoplight? {
        stoplights.first
    }
}

func costReading(_ state: FeedState<CostResponse>) -> HabitStoplight? {
    guard case .loaded(let payload) = state, let circle = payload.cost else { return nil }
    guard let figure = circle.reading, !figure.isEmpty else { return nil }
    return circle
}

func costCaption(_ state: FeedState<CostResponse>) -> String? {
    guard case .loaded(let payload) = state else { return nil }
    return payload.cost?.label
}

enum CostFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/cost")!

    static let previewPayload = CostResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .yellow, reading: "0.50", nextTier: nil, progress: nil,
                label: "Cost"
            )
        ]
    )
}

private struct CostRefused: View {
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

private struct CostNeverLoaded: View {
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

struct CostHomeView: View {
    let entry: FeedEntry<CostResponse>

    var body: some View {
        content
            .padding(LARGE_RING_TILE_PADDING)
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var content: some View {
        switch entry.state {
        case .refused:
            CostRefused()
        case .neverLoaded:
            CostNeverLoaded()
        case .loaded:
            ring
        }
    }

    private var ring: some View {
        let cost = costReading(entry.state)
        return SurplusRing(
            tier: cost?.tier,
            reading: cost?.reading,
            caption: costCaption(entry.state),
            nextTier: cost?.nextTier,
            progress: cost?.progress
        )
    }
}

struct CostWidget: Widget {
    let kind = "CostWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<CostFeed>()) { entry in
            CostHomeView(entry: entry)
        }
        .configurationDisplayName("Cost")
        .description("What an hour of the block Alan is in costs him.")
        .supportedFamilies([.systemSmall])
    }
}
