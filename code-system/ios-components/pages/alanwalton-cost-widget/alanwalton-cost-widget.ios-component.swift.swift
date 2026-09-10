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
    static let endpoint = URL(string: "https://alanwalton.com/api/cost")!

    static let previewPayload = CostResponse(
        stoplights: [
            HabitStoplight(
                habit: nil, tier: .yellow, reading: "0.50", nextTier: nil, progress: nil,
                label: "Cost"
            )
        ]
    )
}

struct CostHomeView: View {
    let entry: FeedEntry<CostResponse>

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
        .widgetURL(URL(string: "capacitor://localhost/nav/tracking-690c624f#widget=alanwalton-cost"))
    }

    private var cost: HabitStoplight? { costReading(entry.state) }

    private var ring: some View {
        SurplusRing(
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
        .description("What an hour of the block you are in costs you.")
        .supportedFamilies([.systemSmall])
    }
}
