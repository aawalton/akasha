import CoreGraphics
import Foundation
import WidgetKit

#if HARNESS_ALANWALTON
let SAFETY_CAPTION_UNDER_TEST = "Safety"
#else
let SAFETY_CAPTION_UNDER_TEST = "Alan's Safety"
#endif

// THE BODY CARRIES WHAT THE FEED CARRIES, INCLUDING THE GROUP'S ANSWER ABOUT A FIGURE OFF SCALE.
//
// The safety group states that it draws its figure past either end of its scale, so a case leaving
// that out would draw a tile no reader ever sees: the number would go at the top and the bottom
// here and stay on the phone. The default is that group's answer, and a case passing false is what
// looks at the other drawing.
func safetyBody(
    tier: String, reading: String, next: String?, progress: String, figureOffScale: Bool = true
) -> String {
    let nextTier = next.map { "\"\($0)\"" } ?? "null"
    return """
        {"stoplights":[{"label":"\(SAFETY_CAPTION_UNDER_TEST)",\
        "tier":"\(tier)","reading":"\(reading)",\
        "nextTier":\(nextTier),"progress":\(progress),\
        "figureOffScale":\(figureOffScale)}]}
        """
}

#if !HARNESS_ALANWALTON
func jennySafetyCases() -> [RenderCase] {
    let jennyHalf = safetyBody(tier: "yellow", reading: "2.5", next: "green", progress: "0.5")
    var all: [RenderCase] = [
        RenderCase(
            name: "safety-level-small", widget: "SafetyLevelWidget",
            familySource: "systemSmall", body: jennyHalf),
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
            name: "safety-level-small-top-figure-held", widget: "SafetyLevelWidget",
            familySource: "systemSmall",
            body: safetyBody(
                tier: "blue", reading: "4", next: nil, progress: "null", figureOffScale: false)),
        RenderCase(
            name: "safety-level-small-placeholder", widget: "SafetyLevelWidget",
            familySource: "systemSmall", body: jennyHalf, placeholder: true),
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
    ]

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "safety-level-small-at-\(Int(width))", widget: "SafetyLevelWidget",
                familySource: "systemSmall", body: jennyHalf,
                sizeOverride: CGSize(width: width, height: width)))
    }
    return all
}
#endif
