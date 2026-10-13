import CoreGraphics
import Foundation
import WidgetKit

// EVERY MOMENT HERE COMES OFF THE RUN'S OWN CLOCK, BECAUSE THE COLOR FALLS WITH THE CLOCK.
//
// The cost tile's color is read off a surplus falling from the moment the surplus was taken,
// so an instant frozen into a fixture would draw a different color every day. Each case is
// handed the run's `now` and states a surplus worked backward from a wait.
//
// A case's name is the only thing carried from here to the file the harness writes, so each
// name says what its picture is meant to show. Read the name, then look at the image and say
// whether it shows that.
// A BODY IS JOINED FROM SINGLE LINE RAW STRINGS, BECAUSE A RAW STRING TAKES NO BARE `\`.
//
// `#"""` opens a string whose escape is `\#`, so a `\` ending a line inside one is a
// backslash in the text rather than the line continuation it looks like, and every body
// written that way reaches the decoder malformed.
private let SURPLUS_RUNGS =
    #"[{"at":-12,"color":"black"},{"at":-8,"color":"red"},{"at":-4,"color":"yellow"},"#
    + #"{"at":0,"color":"green"},{"at":4,"color":"blue"}]"#

private let costInstant: ISO8601DateFormatter = {
    let writer = ISO8601DateFormatter()
    writer.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return writer
}()

private func costBody(tier: String, reading: String, coloredWith: String? = nil) -> String {
    let colored = coloredWith.map { #","coloredWith":\#($0)"# } ?? ""
    return #"{"stoplights":[{"habit":"cost","tier":"\#(tier)","reading":"\#(reading)","#
        + #""label":"Cost"\#(colored)}]}"#
}

// A SURPLUS WHOSE FIGURE IS CHOSEN SO THE WAIT COMES OUT AT THE WIDTH THE CASE WANTS.
//
// The tile reaches the rung under the figure at `(figure - rung) / rate` hours, so a wait of
// `seconds` wants a figure of `rung + rate * seconds / 3600`. The figure has to stay under
// the rung above `rung` or a different rung is the one under it and the wait comes out
// somewhere else. `sent` is the color the server drew, which the tile recolors from the
// figure as of the moment drawn, so stating it wrong is itself worth a picture.
private func fallingSurplus(
    sent: String, over rung: Double, reaching seconds: Double, at rate: Double, from now: Date
) -> String {
    let figure = rung + rate * seconds / 3600
    let taken = costInstant.string(from: now)
    return #"{"tier":"\#(sent)","reading":"\#(figure)","takenAt":"\#(taken)","#
        + #""fallsPerHour":\#(rate),"rungs":\#(SURPLUS_RUNGS)}"#
}

private func restingSurplus(sent: String, reading: String) -> String {
    #"{"tier":"\#(sent)","reading":"\#(reading)"}"#
}

func costCases(now: Date) -> [RenderCase] {
    [
        RenderCase(
            name: "cost-small-surplus-falling-reads-cost-yellow", widget: "CostWidget",
            familySource: "systemSmall",
            body: costBody(
                tier: "yellow", reading: "0.50",
                coloredWith: fallingSurplus(
                    sent: "blue", over: 4, reaching: 46 * 60, at: 3, from: now))),
        RenderCase(
            name: "cost-small-zero-reads-cost-green", widget: "CostWidget",
            familySource: "systemSmall",
            body: costBody(tier: "green", reading: "0.00")),
        RenderCase(
            name: "cost-small-surplus-resting-reads-cost-red", widget: "CostWidget",
            familySource: "systemSmall",
            body: costBody(
                tier: "yellow", reading: "0.50",
                coloredWith: restingSurplus(sent: "green", reading: "1.2"))),
        RenderCase(
            name: "cost-small-no-surplus-stays-black-reads-cost", widget: "CostWidget",
            familySource: "systemSmall",
            body: costBody(tier: "black", reading: "1.40")),
    ]
}
