import SwiftUI
import WidgetKit

struct AttributeStoplight: Decodable, Hashable {
    let attribute: String
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?
}

struct AttributeStoplightsResponse: Decodable {
    let stoplights: [AttributeStoplight]

    init(stoplights: [AttributeStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([AttributeStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one attribute stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

private let ATTRIBUTE_PREVIEW: [(
    attribute: String, tier: Tier, reading: String, nextTier: Tier?, progress: Double?,
    label: String
)] = [
    ("strength", .green, "1.4", .blue, 0.4, "Strength"),
    ("endurance", .yellow, "0.75", .green, 0.5, "Endurance"),
    ("constitution", .blue, "2.3", nil, nil, "Constitution"),
    ("wisdom", .black, "0", .red, nil, "Wisdom"),
    ("intelligence", .red, "0.3", .yellow, 0.2, "Intelligence"),
    ("charisma", .yellow, "0.6", .green, 0.2, "Charisma"),
]

enum AttributeStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/attribute-stoplights")!

    static let previewPayload = AttributeStoplightsResponse(
        stoplights: ATTRIBUTE_PREVIEW.map {
            AttributeStoplight(
                attribute: $0.attribute,
                tier: $0.tier,
                reading: $0.reading,
                nextTier: $0.nextTier,
                progress: $0.progress,
                label: $0.label
            )
        }
    )
}

struct AttributeHomeView: View {
    let entry: FeedEntry<AttributeStoplightsResponse>

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
    }

    private func grid(_ stoplights: [AttributeStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.attribute) {
                StoplightRing(
                    tier: $0.tier,
                    reading: $0.reading,
                    nextTier: $0.nextTier,
                    progress: $0.progress,
                    label: $0.label ?? $0.attribute
                )
            }
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

struct AttributeStoplightsWidget: Widget {
    let kind = "AttributeStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<AttributeStoplightsFeed>()) { entry in
            AttributeHomeView(entry: entry)
        }
        .configurationDisplayName("Attributes")
        .description("Your six attribute stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
