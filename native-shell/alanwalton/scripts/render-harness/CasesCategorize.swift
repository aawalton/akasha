import CoreGraphics
import Foundation
import WidgetKit

func categorizeBody(unreviewed: Int) -> String {
    #"{"unreviewed":\#(unreviewed)}"#
}

let CATEGORIZATION_FIXTURE = categorizeBody(unreviewed: 19)

func categorizeCases() -> [RenderCase] {
    func categorizeWorded(unreviewed: Int, words: String) -> String {
        #"{"unreviewed":\#(unreviewed),"noneLeftWords":"\#(words)"}"#
    }
    func categorizeCelebrated(
        unreviewed: Int, emoji: String, words: String? = nil
    ) -> String {
        let worded = words.map { #","noneLeftWords":"\#($0)""# } ?? ""
        return #"{"unreviewed":\#(unreviewed),"noneLeftEmoji":"\#(emoji)"\#(worded)}"#
    }
    func categorizeScaled(
        unreviewed: Int, yellowAt: Int? = 0, orangeAt: Int, redAt: Int, blackAt: Int
    ) -> String {
        let yellowed = yellowAt.map { #""yellowAt":\#($0),"# } ?? ""
        return #"{"unreviewed":\#(unreviewed),"#
            + #""scale":{\#(yellowed)"orangeAt":\#(orangeAt),"redAt":\#(redAt),"#
            + #""blackAt":\#(blackAt)}}"#
    }

    let noneLeftWords = "All reviewed!"
    let noneLeftEmoji = "🎉"

    var all: [RenderCase] = [
        RenderCase(
            name: "categorize-small", widget: "CategorizeWidget",
            familySource: "systemSmall", body: CATEGORIZATION_FIXTURE),
        RenderCase(
            name: "categorize-small-ten", widget: "CategorizeWidget",
            familySource: "systemSmall", body: categorizeBody(unreviewed: 10)),
        RenderCase(
            name: "categorize-small-none-left", widget: "CategorizeWidget",
            familySource: "systemSmall", body: categorizeBody(unreviewed: 0)),
        RenderCase(
            name: "categorize-small-none-left-words", widget: "CategorizeWidget",
            familySource: "systemSmall",
            body: categorizeWorded(unreviewed: 0, words: noneLeftWords)),
        RenderCase(
            name: "categorize-small-none-left-emoji", widget: "CategorizeWidget",
            familySource: "systemSmall",
            body: categorizeCelebrated(unreviewed: 0, emoji: noneLeftEmoji)),
        RenderCase(
            name: "categorize-small-none-left-emoji-words", widget: "CategorizeWidget",
            familySource: "systemSmall",
            body: categorizeCelebrated(
                unreviewed: 0, emoji: noneLeftEmoji, words: noneLeftWords)),
        RenderCase(
            name: "categorize-small-one-emoji-unspent", widget: "CategorizeWidget",
            familySource: "systemSmall",
            body: categorizeCelebrated(
                unreviewed: 1, emoji: noneLeftEmoji, words: noneLeftWords)),
    ]

    all.append(
        RenderCase(
            name: "categorize-small-nine-hundred", widget: "CategorizeWidget",
            familySource: "systemSmall", body: categorizeBody(unreviewed: 900)))

    for band in [
        (name: "one", unreviewed: 1),
        (name: "ten", unreviewed: 10),
        (name: "eleven", unreviewed: 11),
        (name: "twenty", unreviewed: 20),
        (name: "twenty-one", unreviewed: 21),
        (name: "thirty", unreviewed: 30),
        (name: "thirty-one", unreviewed: 31),
    ] {
        all.append(
            RenderCase(
                name: "categorize-small-scaled-\(band.name)", widget: "CategorizeWidget",
                familySource: "systemSmall",
                body: categorizeScaled(
                    unreviewed: band.unreviewed, orangeAt: 11, redAt: 21, blackAt: 31)))
    }

    all.append(
        RenderCase(
            name: "categorize-small-scaled-five-no-yellow-rung", widget: "CategorizeWidget",
            familySource: "systemSmall",
            body: categorizeScaled(
                unreviewed: 5, yellowAt: nil, orangeAt: 11, redAt: 21, blackAt: 31)))

    for moved in [(name: "red-at-twenty", redAt: 20), (name: "red-at-thirty", redAt: 30)] {
        all.append(
            RenderCase(
                name: "categorize-small-scaled-twenty-five-\(moved.name)",
                widget: "CategorizeWidget", familySource: "systemSmall",
                body: categorizeScaled(
                    unreviewed: 25, orangeAt: 11, redAt: moved.redAt, blackAt: 31)))
    }

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "categorize-small-at-\(Int(width))", widget: "CategorizeWidget",
                familySource: "systemSmall", body: CATEGORIZATION_FIXTURE,
                sizeOverride: CGSize(width: width, height: width)))
    }

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "categorize-small-none-left-at-\(Int(width))", widget: "CategorizeWidget",
                familySource: "systemSmall", body: categorizeBody(unreviewed: 0),
                sizeOverride: CGSize(width: width, height: width)))
    }

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "categorize-small-none-left-words-at-\(Int(width))",
                widget: "CategorizeWidget", familySource: "systemSmall",
                body: categorizeWorded(unreviewed: 0, words: noneLeftWords),
                sizeOverride: CGSize(width: width, height: width)))
    }

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "categorize-small-none-left-emoji-at-\(Int(width))",
                widget: "CategorizeWidget", familySource: "systemSmall",
                body: categorizeCelebrated(unreviewed: 0, emoji: noneLeftEmoji),
                sizeOverride: CGSize(width: width, height: width)))
    }

    for width in [141.0, 170.0] {
        all.append(
            RenderCase(
                name: "categorize-small-none-left-emoji-words-at-\(Int(width))",
                widget: "CategorizeWidget", familySource: "systemSmall",
                body: categorizeCelebrated(
                    unreviewed: 0, emoji: noneLeftEmoji, words: noneLeftWords),
                sizeOverride: CGSize(width: width, height: width)))
    }

    for empty in [
        (rule: "never-read", body: "", unreadable: true),
        (
            rule: "missing-count", body: #"{"noneLeftWords":"All reviewed!"}"#,
            unreadable: true
        ),
    ] {
        all.append(
            RenderCase(
                name: "categorize-small-\(empty.rule)", widget: "CategorizeWidget",
                familySource: "systemSmall", body: empty.body, unreadable: empty.unreadable))
    }

    return all
}
