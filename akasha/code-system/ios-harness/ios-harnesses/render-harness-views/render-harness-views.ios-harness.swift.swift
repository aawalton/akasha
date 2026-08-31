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

func feedState<Payload: Decodable>(
    _ type: Payload.Type, body: Data, unreadable: Bool, refused: Bool
) throws -> FeedState<Payload> {
    #if HARNESS_ALANWALTON
    if refused {
        return .refused
    }
    #endif
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

@MainActor
func makeView(
    widget: String, body: Data, family: WidgetFamily, at date: Date, unreadable: Bool,
    refused: Bool
) throws -> AnyView {
    switch widget {
    #if HARNESS_ALANWALTON
    case "ValuesStoplightsWidget":
        let state = try feedState(ValuesStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(ValuesHomeView(entry: FeedEntry(date: date, state: state)))
    case "ClaudeUsageWidget":
        let state = try feedState(ClaudeUsage.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(
            ClaudeUsageHomeView(
                entry: FeedEntry(date: date, state: state), familyOverride: family))
    case "InboxStoplightsWidget":
        let state = try feedState(InboxStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(InboxHomeView(entry: FeedEntry(date: date, state: state)))
    case "UpkeepStoplightsWidget":
        let state = try feedState(UpkeepStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(UpkeepHomeView(entry: FeedEntry(date: date, state: state)))
    case "PersonaStoplightsWidget":
        let state = try feedState(PersonaStoplightsResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(PersonaStoplightsHomeView(entry: FeedEntry(date: date, state: state)))
    #endif
    case "SafetyLevelWidget":
        let state = try feedState(SafetyLevelResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(SafetyLevelHomeView(entry: FeedEntry(date: date, state: state)))
    case "SurplusWidget":
        let state = try feedState(SurplusResponse.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(SurplusHomeView(entry: FeedEntry(date: date, state: state)))
    case "CategorizeWidget":
        let state = try feedState(Categorization.self, body: body, unreadable: unreadable, refused: refused)
        return AnyView(CategorizeHomeView(entry: FeedEntry(date: date, state: state)))
    default:
        throw Harness.unreachable("no renderer is registered for \(widget)")
    }
}
