import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

struct RenderCase {
    let name: String
    let widget: String
    let familySource: String
    let body: String
    var unreadable = false
    var refused = false
    var placeholder = false
    var sizeOverride: CGSize? = nil
}

func cases(now: Date) -> [RenderCase] {
    var all: [RenderCase] = categorizeCases()

    #if !HARNESS_ALANWALTON
    all.append(contentsOf: jennySafetyCases())
    #endif

    all.append(contentsOf: surplusCases())

    #if HARNESS_ALANWALTON
    func ms(_ secondsFromNow: Double) -> String {
        String(Int((now.timeIntervalSince1970 + secondsFromNow) * 1000))
    }

    let heldSevenDayBack = ms(26 * 3600 + 60)
    let heldSevenDayEnds = ms(152 * 3600 + 60)

    func claude(fiveHourBackAt: String) -> String {
        """
        {"avgUsedPct":76,"fiveHourBackAt":\(fiveHourBackAt),\
        "sevenDayBackAt":\(heldSevenDayBack),"sevenDayEndsAt":\(heldSevenDayEnds),"tier":"yellow"}
        """
    }

    let inbox = """
        {"stoplights":[\
        {"inbox":"email","tier":"black","reading":"3.0k","nextTier":null,"progress":null},\
        {"inbox":"tasks","tier":"blue","reading":"0","nextTier":null,"progress":null},\
        {"inbox":"temperTasks","tier":"red","reading":"23","nextTier":"yellow","progress":0.8444444444444444}]}
        """
    let upkeep = """
        {"stoplights":[\
        {"habit":"plants","tier":"green","reading":"180","nextTier":"blue","progress":0.125,"label":"Plants"},\
        {"habit":"activity","tier":"black","reading":"0","nextTier":null,"progress":null,"label":"Activity"},\
        {"habit":"sleep","tier":"red","reading":"6.4","nextTier":"yellow","progress":0.4,"label":"Sleep"},\
        {"habit":"surplus","tier":"yellow","reading":"-2.5","nextTier":"green","progress":0.375,"label":"Surplus"},\
        {"habit":"capacity","tier":"blue","reading":"12.0","nextTier":null,"progress":null,"label":"Capacity"},\
        {"habit":"safety","tier":"yellow","reading":"2.5","nextTier":"green","progress":0.5,"label":"Safety"}]}
        """
    all.append(contentsOf: [
        RenderCase(
            name: "inbox-stoplights-small", widget: "InboxStoplightsWidget",
            familySource: "systemSmall", body: inbox),
        RenderCase(
            name: "upkeep-stoplights-small", widget: "UpkeepStoplightsWidget",
            familySource: "systemSmall", body: upkeep),
        RenderCase(
            name: "claude-usage-small", widget: "ClaudeUsageWidget",
            familySource: "systemSmall", body: claude(fiveHourBackAt: ms(47 * 60 + 30))),
        RenderCase(
            name: "claude-usage-medium", widget: "ClaudeUsageWidget",
            familySource: "systemMedium", body: claude(fiveHourBackAt: ms(47 * 60 + 30))),
    ])

    let rules: [(rule: String, instant: String)] = [
        ("26h", ms(26 * 3600 + 60)),
        ("47m", ms(47 * 60 + 30)),
        ("1m", ms(40)),
        ("null-reads-none", "null"),
        ("passed-reads-none", ms(-3600)),
    ]
    for rule in rules {
        all.append(
            RenderCase(
                name: "claude-usage-medium-\(rule.rule)", widget: "ClaudeUsageWidget",
                familySource: "systemMedium", body: claude(fiveHourBackAt: rule.instant)))
    }

    for group in ["InboxStoplightsWidget", "UpkeepStoplightsWidget"] {
        all.append(
            RenderCase(
                name: "\(slug(group))-small-never-read", widget: group,
                familySource: "systemSmall", body: "", unreadable: true))
    }

    for tile in [
        (widget: "InboxStoplightsWidget", family: "systemSmall"),
        (widget: "UpkeepStoplightsWidget", family: "systemSmall"),
        (widget: "ClaudeUsageWidget", family: "systemMedium"),
        (widget: "CategorizeWidget", family: "systemSmall"),
    ] {
        all.append(
            RenderCase(
                name: "\(slug(tile.widget))-\(familySpec(source: tile.family)?.cli ?? "?")-refused",
                widget: tile.widget, familySource: tile.family, body: "", refused: true))
    }

    all.append(
        contentsOf: wideAndPlaceholderCases(
            CaseFixtures(
                categorization: CATEGORIZATION_FIXTURE, inbox: inbox,
                upkeep: upkeep,
                claude: claude(fiveHourBackAt: ms(47 * 60 + 30)))))
    #endif
    return all
}
