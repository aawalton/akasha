import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

#if HARNESS_ALANWALTON

struct CaseFixtures {
    let categorization: String
    let values: String
    let inbox: String
    let upkeep: String
    let claude: String
}

func wideAndPlaceholderCases(_ fx: CaseFixtures) -> [RenderCase] {
    var all: [RenderCase] = []
    for tile in [
        (widget: "ValuesStoplightsWidget", family: "systemSmall", body: fx.values),
        (widget: "InboxStoplightsWidget", family: "systemSmall", body: fx.inbox),
        (widget: "UpkeepStoplightsWidget", family: "systemSmall", body: fx.upkeep),
        (widget: "ClaudeUsageWidget", family: "systemMedium", body: fx.claude),
        (widget: "CategorizeWidget", family: "systemSmall", body: fx.categorization),
    ] {
        all.append(
            RenderCase(
                name: "\(slug(tile.widget))-\(familySpec(source: tile.family)?.cli ?? "?")-placeholder",
                widget: tile.widget, familySource: tile.family, body: tile.body, placeholder: true))
    }

    all.append(
        RenderCase(
            name: "upkeep-stoplights-small-widest-at-141", widget: "UpkeepStoplightsWidget",
            familySource: "systemSmall",
            body: """
                {"stoplights":[\
                {"habit":"plants","tier":"blue","reading":"1.2k","nextTier":null,"progress":null,"label":"Plants"},\
                {"habit":"activity","tier":"blue","reading":"1.5k","nextTier":null,"progress":null,"label":"Activity"},\
                {"habit":"sleep","tier":"blue","reading":"10.5","nextTier":null,"progress":null,"label":"Sleep"},\
                {"habit":"surplus","tier":"yellow","reading":"-3.5","nextTier":"green","progress":0.125,"label":"Surplus"},\
                {"habit":"capacity","tier":"black","reading":"-13","nextTier":null,"progress":null,"label":"Capacity"},\
                {"habit":"safety","tier":"green","reading":"3.5","nextTier":"blue","progress":0.5,"label":"Safety"}]}
                """,
            sizeOverride: CGSize(width: 141.0, height: 141.0)))

    all.append(
        RenderCase(
            name: "values-stoplights-small-widest-at-141", widget: "ValuesStoplightsWidget",
            familySource: "systemSmall",
            body: """
                {"stoplights":[\
                {"value":"faith","tier":"blue","face":"Talia","reading":"4.48","nextTier":null,"progress":null},\
                {"value":"love","tier":"green","face":"Ruby","reading":"1.88","nextTier":"blue","progress":0.88},\
                {"value":"health","tier":"yellow","face":"Elaine","reading":"0.88","nextTier":"green","progress":0.76},\
                {"value":"learn","tier":"red","face":"Lali","reading":"0.48","nextTier":"yellow","progress":0.92},\
                {"value":"fun","tier":"black","face":"Zeli","reading":"0.08","nextTier":"red","progress":0.32},\
                {"value":"wealth","tier":"blue","face":"Thea","reading":"3.68","nextTier":null,"progress":null}]}
                """,
            sizeOverride: CGSize(width: 141.0, height: 141.0)))

    all.append(
        RenderCase(
            name: "values-stoplights-small-ends", widget: "ValuesStoplightsWidget",
            familySource: "systemSmall",
            body: """
                {"stoplights":[\
                {"value":"faith","tier":"black","face":"Talia","reading":"0.00","nextTier":"red","progress":0.0},\
                {"value":"love","tier":"black","face":"Ruby","reading":"0.00","nextTier":null,"progress":null},\
                {"value":"health","tier":"black","face":"Elaine","reading":"0.18","nextTier":"red","progress":0.72},\
                {"value":"learn","tier":"green","face":"Lali","reading":"1.00","nextTier":"blue","progress":0.0},\
                {"value":"fun","tier":"blue","face":"Zeli","reading":"2.30","nextTier":null,"progress":null},\
                {"value":"wealth","tier":"yellow","face":"Thea","reading":"0.72","nextTier":"green","progress":0.44}]}
                """))

    all.append(
        RenderCase(
            name: "inbox-stoplights-small-bands-at-141", widget: "InboxStoplightsWidget",
            familySource: "systemSmall",
            body: """
                {"stoplights":[\
                {"inbox":"email","tier":"yellow","reading":"5","nextTier":"green","progress":0.4444444444444444},\
                {"inbox":"tasks","tier":"yellow","reading":"1","nextTier":"green","progress":0.8888888888888888},\
                {"inbox":"temperTasks","tier":"red","reading":"23","nextTier":"yellow","progress":0.8444444444444444},\
                {"inbox":"texts","tier":"black","reading":"130","nextTier":null,"progress":null},\
                {"inbox":"questions","tier":"blue","reading":"0","nextTier":null,"progress":null}]}
                """,
            sizeOverride: CGSize(width: 141.0, height: 141.0)))

    let roster: [(name: String, value: String)] = [
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
    func personaBody(_ roster: [(name: String, value: String)]) -> String {
        let rungs: [(tier: String, next: String?, reading: String)] = [
            ("black", "red", "0.00"), ("green", "blue", "1.12"), ("yellow", "green", "0.61"),
            ("blue", nil, "2.40"), ("red", "yellow", "0.33"), ("green", "blue", "1.05"),
            ("black", "red", "0.00"),
        ]
        let arcs = [0.20, 0.12, 0.44, 0.68, 0.32, 0.05, 0.88]
        let entries = roster.enumerated().map { index, persona -> String in
            let rung = rungs[index % rungs.count]
            let next = rung.next.map { "\"\($0)\"" } ?? "null"
            let arc = rung.next == nil ? "null" : String(format: "%.2f", arcs[index % arcs.count])
            return "{\"persona\":\"\(persona.name)\",\"value\":\"\(persona.value)\","
                + "\"tier\":\"\(rung.tier)\",\"reading\":\"\(rung.reading)\","
                + "\"nextTier\":\(next),\"progress\":\(arc)}"
        }
        return "{\"stoplights\":[\(entries.joined(separator: ","))]}"
    }
    all.append(
        contentsOf: [
            RenderCase(
                name: "persona-stoplights-large", widget: "PersonaStoplightsWidget",
                familySource: "systemLarge", body: personaBody(roster)),
            RenderCase(
                name: "persona-stoplights-large-short", widget: "PersonaStoplightsWidget",
                familySource: "systemLarge", body: personaBody(Array(roster.prefix(6)))),
            RenderCase(
                name: "persona-stoplights-large-placeholder", widget: "PersonaStoplightsWidget",
                familySource: "systemLarge", body: personaBody(roster), placeholder: true),
            RenderCase(
                name: "persona-stoplights-large-refused", widget: "PersonaStoplightsWidget",
                familySource: "systemLarge", body: "", refused: true),
            RenderCase(
                name: "persona-stoplights-large-never-read", widget: "PersonaStoplightsWidget",
                familySource: "systemLarge", body: #"{"stoplights":[]}"#, unreadable: true),
        ])

    let safetyHalf = safetyBody(tier: "yellow", reading: "2.5", next: "green", progress: "0.5")
    all.append(
        contentsOf: [
            RenderCase(
                name: "safety-level-small", widget: "SafetyLevelWidget",
                familySource: "systemSmall", body: safetyHalf),
            RenderCase(
                name: "safety-level-small-whole", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: safetyBody(tier: "green", reading: "3", next: "blue", progress: "0.0")),
            RenderCase(
                name: "safety-level-small-top", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: safetyBody(tier: "blue", reading: "4", next: nil, progress: "null")),
            RenderCase(
                name: "safety-level-small-floor", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: safetyBody(tier: "black", reading: "0.5", next: "red", progress: "0.5")),
            RenderCase(
                name: "safety-level-small-no-reading", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: safetyBody(tier: "black", reading: "0", next: nil, progress: "null")),
            RenderCase(
                name: "safety-level-small-zero", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: safetyBody(tier: "black", reading: "0", next: "red", progress: "0.0")),
            RenderCase(
                name: "safety-level-small-placeholder", widget: "SafetyLevelWidget",
                familySource: "systemSmall", body: safetyHalf, placeholder: true),
            RenderCase(
                name: "safety-level-small-refused", widget: "SafetyLevelWidget",
                familySource: "systemSmall", body: "", refused: true),
            RenderCase(
                name: "safety-level-small-never-read", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: #"{"stoplights":[]}"#,
                unreadable: true),
            RenderCase(
                name: "safety-level-small-no-caption", widget: "SafetyLevelWidget",
                familySource: "systemSmall",
                body: #"{"stoplights":[{"tier":"yellow","reading":"2.5","nextTier":"green","progress":0.5}]}"#
            ),
        ])

    for width in [141.0, 170.0, 220.0] {
        for tile in [
            (widget: "ValuesStoplightsWidget", body: fx.values),
            (widget: "InboxStoplightsWidget", body: fx.inbox),
            (widget: "UpkeepStoplightsWidget", body: fx.upkeep),
        ] {
            all.append(
                RenderCase(
                    name: "\(slug(tile.widget))-small-at-\(Int(width))",
                    widget: tile.widget, familySource: "systemSmall", body: tile.body,
                    sizeOverride: CGSize(width: width, height: width)))
        }
    }

    for width in [141.0, 170.0] {
        for tile in [
            (widget: "SafetyLevelWidget", body: safetyHalf),
            (widget: "ClaudeUsageWidget", body: fx.claude),
        ] {
            all.append(
                RenderCase(
                    name: "\(slug(tile.widget))-small-at-\(Int(width))",
                    widget: tile.widget, familySource: "systemSmall", body: tile.body,
                    sizeOverride: CGSize(width: width, height: width)))
        }
    }
    return all
}

#endif
