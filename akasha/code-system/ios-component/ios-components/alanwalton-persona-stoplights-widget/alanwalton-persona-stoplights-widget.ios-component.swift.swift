import SwiftUI
import WidgetKit

struct PersonaStoplight: Decodable, Hashable {
    let persona: String
    let value: String?
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
}

struct PersonaStoplightsResponse: Decodable {
    let stoplights: [PersonaStoplight]

    init(stoplights: [PersonaStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([PersonaStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one persona stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

enum PersonaStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/persona-stoplights")!

    static let previewPayload = PersonaStoplightsResponse(
        stoplights: PERSONA_PREVIEW.enumerated().map { index, entry in
            let tier = PREVIEW_TIERS[index % PREVIEW_TIERS.count]
            return PersonaStoplight(
                persona: entry.name,
                value: entry.value,
                tier: tier,
                reading: PREVIEW_READINGS[index % PREVIEW_READINGS.count],
                nextTier: PREVIEW_NEXT[tier],
                progress: tier == .blue ? nil : PREVIEW_PROGRESS[index % PREVIEW_PROGRESS.count]
            )
        }
    )
}

private let PERSONA_PREVIEW: [(name: String, value: String)] = [
    ("Abby", "fun"), ("Aelwyn", "love"), ("Aine", "faith"), ("Ali", "learn"),
    ("Amy", "learn"), ("Aranya", "learn"), ("Aria", "fun"), ("Astra", "learn"),
    ("Athena", "learn"), ("Atlas", "learn"), ("Aura", "fun"), ("Awen", "faith"),
    ("Ceri", "faith"), ("Dalla", "love"), ("Echo", "fun"), ("Elaine", "health"),
    ("Elin", "love"), ("Ember", "health"), ("Eppie", "fun"), ("Erin", "love"),
    ("Grace", "health"), ("Ione", "love"), ("Iris", "health"), ("Lali", "learn"),
    ("Mari", "love"), ("Natalie", "wealth"), ("Nimue", "faith"), ("Nova", "health"),
    ("Olwen", "faith"), ("Rhia", "love"), ("Ruby", "love"), ("Ryn", "fun"),
    ("Selah", "love"), ("Shaestrel", "learn"), ("Sophia", "learn"), ("Talia", "faith"),
    ("Thea", "wealth"), ("Vera", "health"), ("Zadi", "fun"), ("Zeli", "fun"),
]

private let PREVIEW_TIERS: [Tier] = [.green, .black, .yellow, .blue, .red, .green, .black]
private let PREVIEW_READINGS = ["1.20", "0.00", "0.61", "2.40", "0.33", "1.05", "0.00"]
private let PREVIEW_PROGRESS = [0.20, 0.12, 0.44, 0.68, 0.32, 0.05, 0.88]
private let PREVIEW_NEXT: [Tier: Tier] = [
    .black: .red, .red: .yellow, .yellow: .green, .green: .blue,
]

private let LABEL_BLOCK: CGFloat = 11 + SPACING_0_5

private let TILE_CONTENT_MARGIN: CGFloat = 16

private let TILE_GAP: CGFloat = 22

private func smallRingDiameter(largeTileContentWidth: CGFloat) -> CGFloat {
    let largeTileWidth = largeTileContentWidth + TILE_CONTENT_MARGIN * 2
    let smallTileContentWidth = (largeTileWidth - TILE_GAP) / 2 - TILE_CONTENT_MARGIN * 2
    return max(0, (smallTileContentWidth - SPACING_2 * 2) / 3)
}

private func cellsThatFit(in space: CGFloat, side: CGFloat, gap: CGFloat) -> Int {
    guard side > 0 else { return 1 }
    return max(1, Int((space + gap) / (side + gap)))
}

struct PersonaStoplightsHomeView: View {
    let entry: FeedEntry<PersonaStoplightsResponse>

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

    private func grid(_ stoplights: [PersonaStoplight]) -> some View {
        GeometryReader { geo in
            let side = smallRingDiameter(largeTileContentWidth: geo.size.width)
            let columns = cellsThatFit(in: geo.size.width, side: side, gap: SPACING_1)
            let rows = cellsThatFit(
                in: geo.size.height, side: side + LABEL_BLOCK, gap: SPACING_1)
            let drawn = min(stoplights.count, columns * rows)
            let usedRows = max(1, Int(ceil(Double(drawn) / Double(columns))))
            VStack(spacing: SPACING_1) {
                ForEach(0..<usedRows, id: \.self) { row in
                    HStack(spacing: SPACING_1) {
                        ForEach(0..<columns, id: \.self) { column in
                            cell(
                                stoplights, index: row * columns + column, drawn: drawn,
                                side: side)
                        }
                    }
                }
            }
            .frame(width: geo.size.width, height: geo.size.height)
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private func cell(
        _ stoplights: [PersonaStoplight], index: Int, drawn: Int, side: CGFloat
    ) -> some View {
        if index < drawn {
            let stoplight = stoplights[index]
            StoplightRing(
                tier: stoplight.tier,
                reading: stoplight.reading,
                nextTier: stoplight.nextTier,
                progress: stoplight.progress,
                label: stoplight.persona
            )
            .frame(width: side)
        } else {
            Color.clear.frame(width: side, height: side + LABEL_BLOCK)
        }
    }
}

struct PersonaStoplightsWidget: Widget {
    let kind = "PersonaStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<PersonaStoplightsFeed>()) { entry in
            PersonaStoplightsHomeView(entry: entry)
        }
        .configurationDisplayName("Personas")
        .description("Every persona's stoplight for today, on one tile.")
        .supportedFamilies([.systemLarge])
    }
}
