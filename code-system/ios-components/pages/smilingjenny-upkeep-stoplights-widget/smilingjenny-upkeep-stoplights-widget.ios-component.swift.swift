import SwiftUI
import WidgetKit

struct UpkeepStoplightsResponse: Decodable {
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
                debugDescription: "expected at least one upkeep stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

private let UPKEEP_PREVIEW: [(
    habit: String, tier: Tier, reading: String, nextTier: Tier?, progress: Double?, label: String
)] = [
    ("safety", .yellow, "2.5", .green, 0.50, "Safety"),
    ("surplus", .yellow, "-2.5", .green, 0.375, "Surplus"),
    ("capacity", .blue, "12.0", nil, nil, "Capacity"),
    ("sleep", .red, "6.4", .yellow, 0.40, "Sleep"),
]

enum UpkeepStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://smilingjenny.me/api/upkeep")!

    static let previewPayload = UpkeepStoplightsResponse(
        stoplights: UPKEEP_PREVIEW.map {
            HabitStoplight(
                habit: $0.habit,
                tier: $0.tier,
                reading: $0.reading,
                nextTier: $0.nextTier,
                progress: $0.progress,
                label: $0.label
            )
        }
    )
}

private struct UpkeepRefused: View {
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

private struct UpkeepNeverLoaded: View {
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

struct UpkeepHomeView: View {
    let entry: FeedEntry<UpkeepStoplightsResponse>

    var body: some View {
        content
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var content: some View {
        switch entry.state {
        case .refused:
            UpkeepRefused()
        case .neverLoaded:
            UpkeepNeverLoaded()
        case .loaded(let payload):
            grid(payload.stoplights)
        }
    }

    private func grid(_ stoplights: [HabitStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.self) {
                StoplightRing(
                    tier: $0.tier,
                    reading: $0.figure(asOf: entry.date),
                    nextTier: $0.nextTier,
                    progress: $0.progress,
                    label: $0.label ?? $0.habit,
                    figureOffScale: $0.figureOffScale ?? false
                )
            }
        }
    }
}

struct UpkeepStoplightsWidget: Widget {
    let kind = "HabitStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<UpkeepStoplightsFeed>()) { entry in
            UpkeepHomeView(entry: entry)
        }
        .configurationDisplayName("Upkeep")
        .description("Alan's four upkeep stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
