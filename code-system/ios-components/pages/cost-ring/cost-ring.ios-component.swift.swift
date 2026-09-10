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
