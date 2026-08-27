import CoreGraphics
import Foundation
import WidgetKit

#if HARNESS_ALANWALTON
let SAFETY_CAPTION_UNDER_TEST = "Safety"
#else
let SAFETY_CAPTION_UNDER_TEST = "Alan's Safety"
#endif

func safetyBody(tier: String, reading: String, next: String?, progress: String) -> String {
    let nextTier = next.map { "\"\($0)\"" } ?? "null"
    return """
        {"stoplights":[{"label":"\(SAFETY_CAPTION_UNDER_TEST)",\
        "tier":"\(tier)","reading":"\(reading)",\
        "nextTier":\(nextTier),"progress":\(progress)}]}
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
