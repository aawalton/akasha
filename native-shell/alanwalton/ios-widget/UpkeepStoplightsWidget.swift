import SwiftUI
import WidgetKit

struct UpkeepStoplight: Decodable, Hashable {
    let habit: String
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?
}

struct UpkeepStoplightsResponse: Decodable {
    let stoplights: [UpkeepStoplight]

    init(stoplights: [UpkeepStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([UpkeepStoplight].self, forKey: .stoplights)
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
    ("plants", .green, "180", .blue, 0.125, "Plants"),
    ("activity", .black, "0", nil, nil, "Activity"),
    ("sleep", .red, "6.4", .yellow, 0.40, "Sleep"),
    ("surplus", .yellow, "-2.5", .green, 0.375, "Surplus"),
    ("capacity", .blue, "12.0", nil, nil, "Capacity"),
    ("safety", .yellow, "2.5", .green, 0.5, "Safety"),
]

enum UpkeepStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/habit-stoplights")!

    static let previewPayload = UpkeepStoplightsResponse(
        stoplights: UPKEEP_PREVIEW.map {
            UpkeepStoplight(
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

struct UpkeepHomeView: View {
    let entry: FeedEntry<UpkeepStoplightsResponse>

    var body: some View {
        Group {
            switch entry.state {
            case .loaded(let payload):
                grid(payload.stoplights)
            case .neverLoaded:
                NeverLoadedView()
            case .refused:
                RefusedView()
            }
        }
        .widgetURL(
            URL(
                string:
                    "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1"
            )
        )
    }

    private func grid(_ stoplights: [UpkeepStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.habit) {
                StoplightRing(
                    tier: $0.tier,
                    reading: $0.reading,
                    nextTier: $0.nextTier,
                    progress: $0.progress,
                    label: $0.label ?? $0.habit
                )
            }
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

struct UpkeepStoplightsWidget: Widget {
    let kind = "HabitStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<UpkeepStoplightsFeed>()) { entry in
            UpkeepHomeView(entry: entry)
        }
        .configurationDisplayName("Upkeep")
        .description("Your six upkeep stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
