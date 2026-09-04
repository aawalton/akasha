import CoreGraphics
import Foundation
import WidgetKit

func surplusEntry(
    tier: String, reading: String, next: String?, progress: String, label: String
) -> String {
    let nextTier = next.map { "\"\($0)\"" } ?? "null"
    return """
        {"label":"\(label)","tier":"\(tier)","reading":"\(reading)",\
        "nextTier":\(nextTier),"progress":\(progress)}
        """
}

func surplusBody(tier: String, reading: String, next: String?, progress: String, label: String)
    -> String
{
    let surplus = surplusEntry(
        tier: tier, reading: reading, next: next, progress: progress, label: label)
    return "{\"stoplights\":[\(surplus)]}"
}

#if HARNESS_ALANWALTON
let SURPLUS_CAPTION_UNDER_TEST = "Surplus"
#else
let SURPLUS_CAPTION_UNDER_TEST = "Alan's Surplus"
#endif

func surplusCases() -> [RenderCase] {
    let caption = SURPLUS_CAPTION_UNDER_TEST
    let spare = surplusBody(
        tier: "green", reading: "1.2", next: "blue", progress: "0.3", label: caption)

    var all: [RenderCase] = [
        RenderCase(
            name: "surplus-small", widget: "SurplusWidget",
            familySource: "systemSmall", body: spare),
        RenderCase(
            name: "surplus-small-deep-deficit", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: surplusBody(
                tier: "black", reading: "-20", next: "red", progress: "0.0", label: caption)),
        RenderCase(
            name: "surplus-small-just-under-black", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: surplusBody(
                tier: "black", reading: "-13", next: "red", progress: "0.0", label: caption)),
        RenderCase(
            name: "surplus-small-in-black-band", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: surplusBody(
                tier: "black", reading: "-10", next: "red", progress: "0.5", label: caption)),
        RenderCase(
            name: "surplus-small-top", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: surplusBody(
                tier: "blue", reading: "9.3", next: nil, progress: "null", label: caption)),
        RenderCase(
            name: "surplus-small-no-reading", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: surplusBody(
                tier: "black", reading: "0.0", next: nil, progress: "null", label: caption)),
        RenderCase(
            name: "surplus-small-placeholder", widget: "SurplusWidget",
            familySource: "systemSmall", body: spare, placeholder: true),
        RenderCase(
            name: "surplus-small-never-read", widget: "SurplusWidget",
            familySource: "systemSmall",
            body: #"{"stoplights":[]}"#,
            unreadable: true),
    ]

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "surplus-small-widest-at-\(Int(width))", widget: "SurplusWidget",
                familySource: "systemSmall",
                body: surplusBody(
                    tier: "black", reading: "-20", next: "red", progress: "0.0", label: caption),
                sizeOverride: CGSize(width: width, height: width)))
    }
    return all
}
