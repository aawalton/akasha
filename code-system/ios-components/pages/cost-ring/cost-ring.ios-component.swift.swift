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
    // The server reads a cost's color from the cost and the surplus together: a cost of
    // nothing is green whatever the surplus is, a cost above one is black whatever it is,
    // and a cost between reads yellow under a blue surplus, red under a green one and black
    // under anything worse. So a cost the server drew yellow or red is a cost between, and
    // its color from here on is the surplus alone. A cost drawn green or black stays as it
    // is: green means the cost is nothing, and black means either the cost is above one or
    // the surplus is already worse than green, which a falling surplus never climbs out of.
    //
    // Reading the band back off the color rather than off the figure keeps this exact. The
    // figure is floored to a decimal place before it is sent, so a cost of 1.04 reaches the
    // phone as "1" and would be read as the wrong band.
    static func shown(_ sent: Tier, _ surplus: Tier) -> Tier {
        guard sent == .yellow || sent == .red else { return sent }
        if surplus == .blue { return .yellow }
        if surplus == .green { return .red }
        return .black
    }

    static func tier(_ cost: HabitStoplight?, _ now: Date) -> Tier? {
        guard let cost else { return nil }
        guard let coloredWith = cost.coloredWith else { return cost.tier }
        return shown(cost.tier, coloredWith.tier(asOf: now))
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
