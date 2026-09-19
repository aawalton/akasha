import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

enum Harness: Error {
    case unreachable(String)
    case failed(String)

    static func message(_ error: Error) -> String {
        switch error {
        case Harness.unreachable(let text), Harness.failed(let text): return text
        default: return "\(error)"
        }
    }
}

// A REFUSED FETCH IS A STATE EVERY APP'S FEED CARRIES.
//
// Both feeds answer `.refused` where the baked credential is missing or where the server says 401,
// so a gate here would leave one app's refused tiles unrenderable and unlooked at.
func feedState<Payload: Decodable>(
    _ type: Payload.Type, body: Data, unreadable: Bool, refused: Bool
) throws -> FeedState<Payload> {
    if refused {
        return .refused
    }
    if unreadable {
        if (try? JSONDecoder().decode(type, from: body)) != nil {
            throw Harness.failed(
                "this case says the tile cannot read the body, and it decoded — so it renders "
                    + "the loaded tile and asserts nothing")
        }
        return .neverLoaded
    }
    return .loaded(try JSONDecoder().decode(type, from: body))
}

// THE COST TILE IS DRAWN UNDER FOUR NAMES, ONE FOR EACH FORM ITS COUNTDOWN IS WRITTEN IN.
//
// The bundle ships `CostWidget` alone, so a case under that name is handed no form and is drawn
// in the form the tile itself holds, which makes the picture the picture a phone draws. The
// three others ask for no coverage line and are reached only by a case naming one of them.
private func costCountdown(_ widget: String) -> RingCountdown? {
    switch widget {
    case "CostTimerWidget": return .timer
    case "CostTimerAloneWidget": return .timerAlone
    case "CostTimerNoHoursWidget": return .timerWithoutHours
    default: return nil
    }
}

@MainActor
func makeView(
    widget: String, body: Data, family: WidgetFamily, at date: Date, unreadable: Bool,
    refused: Bool
) throws -> AnyView {
    switch widget {
    // THE GATE HOLDS ONLY THE TILES ALAN'S BUNDLE ALONE CARRIES.
    //
    // Their payload and their view live in components only his program names, so nothing compiles
    // those three names into Jenny's harness. Every other tile here is built by both programs.
    #if HARNESS_ALANWALTON
    case "ClaudeUsageWidget":
        let state = try feedState(ClaudeUsage.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(
            ClaudeUsageHomeView(
                entry: FeedEntry(date: date, state: state), familyOverride: family))
    case "InboxStoplightsWidget":
        let state = try feedState(InboxStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(InboxHomeView(entry: FeedEntry(date: date, state: state)))
    case "AttributeStoplightsWidget":
        let state = try feedState(AttributeStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(AttributeHomeView(entry: FeedEntry(date: date, state: state)))
    // THE LIVE ACTIVITY IS HANDED ITS CONTENT RATHER THAN FETCHING ONE, SO IT HAS NO FEED STATE.
    //
    // Nothing it holds comes off a feed, so it has no refused and no never-loaded picture to
    // render, and the body is read straight. The moment it carries is spelled the way the app
    // spells it when it hands one over, which is why the reader here is the reader the app uses.
    // THE ISLAND IS DRAWN UNDER A SECOND NAME, THE WAY THE COST TILE'S FORMS ARE.
    //
    // The bundle ships `StoplightsActivity` alone, so that name asks for the lock screen and the
    // island's name asks for no coverage line and is reached only by a case naming it.
    case "StoplightsActivity", "StoplightsIslandWidget":
        let reader = JSONDecoder()
        reader.dateDecodingStrategy = .iso8601
        let content = try reader.decode(StoplightsAttributes.ContentState.self, from: body)
        if widget == "StoplightsIslandWidget" {
            return AnyView(StoplightsIslandView(state: content))
        }
        return AnyView(StoplightsActivityView(state: content))
    #endif
    case "UpkeepStoplightsWidget":
        let state = try feedState(UpkeepStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(UpkeepHomeView(entry: FeedEntry(date: date, state: state)))
    case "SafetyLevelWidget":
        let state = try feedState(SafetyLevelResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(SafetyLevelHomeView(entry: FeedEntry(date: date, state: state)))
    case "CostWidget", "CostTimerWidget", "CostTimerAloneWidget", "CostTimerNoHoursWidget":
        let state = try feedState(CostResponse.self, body: body, unreadable: unreadable, refused: refused)
        let costEntry = FeedEntry(date: date, state: state)
        guard let form = costCountdown(widget) else { return AnyView(CostHomeView(entry: costEntry)) }
        return AnyView(CostHomeView(entry: costEntry, countdown: form))
    case "SurplusWidget":
        let state = try feedState(SurplusResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(SurplusHomeView(entry: FeedEntry(date: date, state: state)))
    case "CategorizeWidget":
        let state = try feedState(Categorization.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(CategorizeHomeView(entry: FeedEntry(date: date, state: state)))
    // THE FRESHNESS TILE READS THE PHONE'S OWN STORE, SO A CASE HANDS IT ONE IN A BODY.
    //
    // Nothing it draws comes off a feed, so it has no refused and no never-loaded state to
    // render and the body is read straight rather than through `feedState`.
    case "FreshnessWidget":
        let readout = try JSONDecoder().decode(FreshnessReadout.self, from: body)
        return AnyView(FreshnessHomeView(entry: FreshnessReading.made(readout, at: date)))
    default:
        throw Harness.unreachable("no renderer is registered for \(widget)")
    }
}
