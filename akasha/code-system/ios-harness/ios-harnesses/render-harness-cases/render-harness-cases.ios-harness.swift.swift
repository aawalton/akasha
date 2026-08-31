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

    let values = """
        {"stoplights":[\
        {"value":"faith","tier":"green","face":"Talia","reading":"1.40","nextTier":"blue","progress":0.4},\
        {"value":"love","tier":"blue","face":"Ruby","reading":"2.30","nextTier":null,"progress":null},\
        {"value":"health","tier":"yellow","face":"Elaine","reading":"0.72","nextTier":"green","progress":0.44},\
        {"value":"learn","tier":"red","face":"Lali","reading":"0.31","nextTier":"yellow","progress":0.24},\
        {"value":"fun","tier":"black","face":"Zeli","reading":"0.18","nextTier":"red","progress":0.72},\
        {"value":"wealth","tier":"green","face":"Thea","reading":"1.05","nextTier":"blue","progress":0.05}]}
        """
    let valuesSweep = """
        {"stoplights":[\
        {"value":"faith","tier":"green","face":"Talia","reading":"1.02","nextTier":"blue","progress":0.02},\
        {"value":"love","tier":"green","face":"Ruby","reading":"1.25","nextTier":"blue","progress":0.25},\
        {"value":"health","tier":"green","face":"Elaine","reading":"1.50","nextTier":"blue","progress":0.5},\
        {"value":"learn","tier":"green","face":"Lali","reading":"1.75","nextTier":"blue","progress":0.75},\
        {"value":"fun","tier":"green","face":"Zeli","reading":"1.98","nextTier":"blue","progress":0.98},\
        {"value":"wealth","tier":"blue","face":"Thea","reading":"2.00","nextTier":null,"progress":null}]}
        """
    let inbox = """
        {"stoplights":[\
        {"inbox":"email","tier":"black","reading":"3.0k","nextTier":null,"progress":null},\
        {"inbox":"tasks","tier":"blue","reading":"0","nextTier":null,"progress":null},\
        {"inbox":"temperTasks","tier":"red","reading":"23","nextTier":"yellow","progress":0.8444444444444444},\
        {"inbox":"texts","tier":"green","reading":"6","nextTier":null,"progress":null},\
        {"inbox":"questions","tier":"yellow","reading":"2","nextTier":"green","progress":0.5}]}
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
            name: "values-stoplights-small", widget: "ValuesStoplightsWidget",
            familySource: "systemSmall", body: values),
        RenderCase(
            name: "values-stoplights-small-sweep", widget: "ValuesStoplightsWidget",
            familySource: "systemSmall", body: valuesSweep),
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

    for group in ["ValuesStoplightsWidget", "InboxStoplightsWidget", "UpkeepStoplightsWidget"] {
        all.append(
            RenderCase(
                name: "\(slug(group))-small-never-read", widget: group,
                familySource: "systemSmall", body: "", unreadable: true))
    }

    for tile in [
        (widget: "ValuesStoplightsWidget", family: "systemSmall"),
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
                categorization: CATEGORIZATION_FIXTURE, values: values, inbox: inbox,
                upkeep: upkeep,
                claude: claude(fiveHourBackAt: ms(47 * 60 + 30)))))
    #endif
    return all
}
