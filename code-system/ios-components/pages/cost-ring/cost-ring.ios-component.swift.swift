import Foundation
import SwiftUI
import WidgetKit

// THE WAIT SHRINKS ONE SECOND PER SECOND, SO THE FEED SENDS AN INSTANT RATHER THAN A WAIT.
//
// The surplus falls at a steady rate while a block runs, so it reaches the rung under it at
// `takenAt + (surplus - rung) / rate`. That moment holds no `now` in it: whatever the rate
// is, the wait left at any clock reading is the moment less the clock, which loses exactly
// one second for every second that passes. The phone therefore does no arithmetic with the
// rate at all, and a rate of thirty-two is counted down as truly as a rate of one.
//
// A cost of nothing, a surplus that is not falling, and a surplus already under the lowest
// rung all reach the phone carrying no instant, and the caption stays the readout's label.
enum CostCountdown {
    static func reaching(_ fallsPastAt: String?, _ now: Date) -> Date? {
        guard let at = FallingReading.instant(fallsPastAt) else { return nil }
        return at > now ? at : nil
    }
}

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
