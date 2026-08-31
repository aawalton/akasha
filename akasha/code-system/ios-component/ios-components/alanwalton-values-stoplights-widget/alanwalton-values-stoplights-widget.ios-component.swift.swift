import SwiftUI
import WidgetKit

struct ValueStoplight: Decodable, Hashable {
    let value: String
    let label: String?
    let tier: Tier
    let face: String?
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
}

struct ValuesStoplightsResponse: Decodable {
    let stoplights: [ValueStoplight]

    init(stoplights: [ValueStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([ValueStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one value stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

private let VALUE_PREVIEW: [(
    value: String, label: String, tier: Tier, reading: String, nextTier: Tier?, progress: Double?,
    face: String
)] = [
    ("faith", "Faith", .green, "1.40", .blue, 0.40, "Talia"),
    ("love", "Love", .green, "1.05", .blue, 0.05, "Ruby"),
    ("health", "Health", .blue, "2.30", nil, nil, "Elaine"),
    ("learn", "Learn", .yellow, "0.72", .green, 0.44, "Lali"),
    ("fun", "Fun", .red, "0.31", .yellow, 0.24, "Zeli"),
    ("wealth", "Wealth", .black, "0.18", .red, 0.72, "Thea"),
]

enum ValuesStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/values-stoplights")!

    static let previewPayload = ValuesStoplightsResponse(
        stoplights: VALUE_PREVIEW.map {
            ValueStoplight(
                value: $0.value,
                label: $0.label,
                tier: $0.tier,
                face: $0.face,
                reading: $0.reading,
                nextTier: $0.nextTier,
                progress: $0.progress
            )
        }
    )
}

struct ValuesHomeView: View {
    let entry: FeedEntry<ValuesStoplightsResponse>

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
                    "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c"
            )
        )
    }

    private func grid(_ stoplights: [ValueStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.value) {
                StoplightRing(
                    tier: $0.tier,
                    reading: $0.reading,
                    nextTier: $0.nextTier,
                    progress: $0.progress,
                    label: $0.label ?? $0.value
                )
            }
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

struct ValuesStoplightsWidget: Widget {
    let kind = "ValuesStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<ValuesStoplightsFeed>()) { entry in
            ValuesHomeView(entry: entry)
        }
        .configurationDisplayName("Values")
        .description("Your six daily values stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
