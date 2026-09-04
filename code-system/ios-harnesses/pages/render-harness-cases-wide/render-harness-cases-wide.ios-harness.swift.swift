import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

#if HARNESS_ALANWALTON

struct CaseFixtures {
    let categorization: String
    let inbox: String
    let upkeep: String
    let claude: String
}

func wideAndPlaceholderCases(_ fx: CaseFixtures) -> [RenderCase] {
    var all: [RenderCase] = []
    for tile in [
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
            name: "inbox-stoplights-small-bands-at-141", widget: "InboxStoplightsWidget",
            familySource: "systemSmall",
            body: """
                {"stoplights":[\
                {"inbox":"email","tier":"yellow","reading":"5","nextTier":"green","progress":0.4444444444444444},\
                {"inbox":"tasks","tier":"yellow","reading":"1","nextTier":"green","progress":0.8888888888888888},\
                {"inbox":"temperTasks","tier":"red","reading":"23","nextTier":"yellow","progress":0.8444444444444444}]}
                """,
            sizeOverride: CGSize(width: 141.0, height: 141.0)))

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
