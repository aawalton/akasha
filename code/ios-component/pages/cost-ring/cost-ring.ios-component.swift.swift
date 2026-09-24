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
    static func reaching(_ coloredWith: ColoredWith?, _ now: Date) -> Date? {
        guard let at = coloredWith?.reaching(now) else { return nil }
        return at > now ? at : nil
    }

    // A COST DRAWN YELLOW OR RED IS PRICED WHERE THE SURPLUS DECIDES THE COLOR.
    //
    // The server colors a cost by five bands of the surplus in hours and the cost multiplier,
    // taking the first band both of them fit: over four hours at no cost is blue, over nothing
    // at no cost is green, over minus four at a cost of one or less is yellow, over minus
    // eight at a cost of two or less is red, and anything else is black. A cost of nothing
    // carries no surplus at all, so a cost this re-colors is always above nothing and reaches
    // neither of the first two bands.
    //
    // That leaves yellow and red to follow down. A cost sent yellow is priced at one or less,
    // so it is yellow while the surplus is over minus four, red while it is over minus eight,
    // and black under that. A cost sent red is either priced at one or less with the surplus
    // already under minus four, or priced between one and two: both are red while the surplus
    // is over minus eight and black under it, so the two need not be told apart. The surplus
    // only falls, so black is never climbed back out of.
    //
    // Reading the band back off the color rather than off the figure keeps this exact. The
    // figure is floored to a decimal place before it is sent, so a cost of 1.04 reaches the
    // phone as "1" and would be read as the wrong band.
    static let YELLOW_OVER = -4.0

    static let RED_OVER = -8.0

    static func shown(_ sent: Tier, _ surplusHours: Double) -> Tier {
        guard sent == .yellow || sent == .red else { return sent }
        if sent == .yellow, surplusHours > YELLOW_OVER { return .yellow }
        return surplusHours > RED_OVER ? .red : .black
    }

    static func tier(_ cost: HabitStoplight?, _ now: Date) -> Tier? {
        guard let cost else { return nil }
        guard let hours = cost.coloredWith?.hours(asOf: now) else { return cost.tier }
        return shown(cost.tier, hours)
    }

    // THE MOMENT THIS TILE STOPS BEING RIGHT, WHICH IS THE MOMENT THE FEED ASKS TO BE SHOWN.
    //
    // It is the same instant the caption counts down to, and that is not a coincidence: the
    // caption reaches zero exactly when the color moves and the countdown has to re-aim at
    // the rung below. Both feeds hand this to their timeline, which puts a second entry
    // there so the tile is worked out again at that instant rather than up to a refresh
    // later.
    static func turning(_ payload: CostResponse, _ now: Date) -> Date? {
        reaching(payload.cost?.coloredWith, now)
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

func costNoSignal(_ state: FeedState<CostResponse>) -> Bool {
    guard case .loaded(let payload) = state else { return false }
    return payload.cost?.noSignal ?? false
}
