import Foundation

// WHAT A TIMELINE IS MADE OF, WHICH IS THE ONE PART OF THE PROVIDER A HARNESS CAN RUN.
//
// `FeedProvider.getTimeline` cannot be called from here. It wants a `TimelineProviderContext`
// and nothing outside WidgetKit makes one. So the rule the provider follows was lifted out of
// it into `FeedTimeline`, which takes plain values, and that is what these assertions run.
// What stays unrun is the four lines of wiring inside `getTimeline` itself: this harness
// compiles them and never calls them.
//
// `turns` is a protocol requirement carrying a default in an extension, and in Swift the
// difference between the two is whether a call through a generic reaches the conformer or the
// default. The two feeds below settle that, since every tile but the cost tile depends on
// reaching the default and the cost tile depends on not reaching it.
enum TimelineChecks {
    struct Seconds: Decodable {
        let seconds: Double
    }

    enum QuietFeed: WidgetFeed {
        static let endpoint = URL(string: "https://example.invalid/quiet")!
        static let previewPayload = Seconds(seconds: 0)
    }

    enum TurningFeed: WidgetFeed {
        static let endpoint = URL(string: "https://example.invalid/turning")!
        static let previewPayload = Seconds(seconds: 0)

        static func turns(_ payload: Seconds, after now: Date) -> Date? {
            now.addingTimeInterval(payload.seconds)
        }
    }

    private static func costing(_ extra: String) -> CostResponse? {
        let sent = Data(
            #"{"stoplights":[{"habit":"cost","tier":"red","reading":"0.5","label":"Cost"\#(extra)}]}"#
                .utf8)
        return try? JSONDecoder().decode(CostResponse.self, from: sent)
    }

    // `CostFeed` BELOW IS THE APP'S OWN, WHICH IS WHY EACH HARNESS NAMES ITS COST WIDGET.
    //
    // Each app declares its own `CostFeed`, one to a target, so this file reaches whichever
    // one it was compiled beside. Asking that feed rather than a stand-in is the only way
    // the conformance a phone will run is the conformance a check ran. A harness that stops
    // naming its cost widget stops building here, which is the reminder wanted.
    static func run() -> [(String, Bool, String)] {
        let now = FallingChecks.tookAt
        let soon = now.addingTimeInterval(600)
        let gone = now.addingTimeInterval(-600)
        let ten = Seconds(seconds: 600)
        let colored = costing(FallingChecks.SENT)
        let plain = costing("")
        let reached = now.addingTimeInterval(1800)
        let names = { (moment: Date) in colored.flatMap { CostCountdown.turning($0, moment) } }
        return [
            (
                "a feed naming no moment is given the one entry it had",
                FeedTimeline.dates(now: now, turning: nil) == [now], "one entry"
            ),
            (
                "a moment still to come is given a second entry standing at it",
                FeedTimeline.dates(now: now, turning: soon) == [now, soon], "two entries"
            ),
            (
                "a moment already gone is given no second entry rather than one in the past",
                FeedTimeline.dates(now: now, turning: gone) == [now], "one entry"
            ),
            (
                "a moment that is this moment is given no second entry",
                FeedTimeline.dates(now: now, turning: now) == [now], "one entry"
            ),
            (
                "the first entry stands at this moment whether or not a second follows",
                FeedTimeline.dates(now: now, turning: soon).first == now
                    && FeedTimeline.dates(now: now, turning: nil).first == now,
                "this moment first"
            ),
            (
                "a feed naming no moment of its own is answered with none",
                FeedTimeline.turning(QuietFeed.self, .loaded(ten), now) == nil,
                "the default answers nothing"
            ),
            (
                "a feed naming a moment of its own is asked rather than the default",
                FeedTimeline.turning(TurningFeed.self, .loaded(ten), now) == soon,
                String(describing: FeedTimeline.turning(TurningFeed.self, .loaded(ten), now))
            ),
            (
                "a feed that has never loaded is asked for no moment",
                FeedTimeline.turning(TurningFeed.self, .neverLoaded, now) == nil, "no payload"
            ),
            (
                "a feed refused is asked for no moment",
                FeedTimeline.turning(TurningFeed.self, .refused, now) == nil, "no payload"
            ),
            (
                "a cost carrying the surplus it was colored with names the moment that runs out",
                names(now) == reached, String(describing: names(now))
            ),
            (
                "the moment a cost names is the moment its caption counts down to",
                names(now) == CostCountdown.reaching(colored?.cost?.coloredWith, now),
                "one moment, not two"
            ),
            (
                "a cost carrying no such surplus names nothing and keeps the one entry",
                plain != nil && plain.flatMap { CostCountdown.turning($0, now) } == nil
                    && FeedTimeline.dates(now: now, turning: nil) == [now],
                "one entry"
            ),
            (
                "a cost naming a moment is given a second entry standing at it",
                FeedTimeline.dates(now: now, turning: names(now)) == [now, reached],
                "two entries"
            ),
            (
                "the app's own cost feed answers the moment the cost names",
                colored.flatMap { FeedTimeline.turning(CostFeed.self, .loaded($0), now) }
                    == reached,
                String(
                    describing: colored.flatMap {
                        FeedTimeline.turning(CostFeed.self, .loaded($0), now)
                    })
            ),
            (
                "the app's own cost feed answers no moment before it has loaded",
                FeedTimeline.turning(CostFeed.self, .neverLoaded, now) == nil, "no payload"
            ),
            (
                "the timeline the app's own cost feed asks for stands two entries",
                colored.flatMap {
                    FeedTimeline.turning(CostFeed.self, .loaded($0), now)
                }.map { FeedTimeline.dates(now: now, turning: $0) } == [now, reached],
                "two entries"
            ),
            (
                "the entry at that moment re-aims at the rung under the one just reached",
                FeedTimeline.dates(now: reached, turning: names(reached))
                    == [reached, reached.addingTimeInterval(14400)],
                String(describing: names(reached))
            ),
        ]
    }
}
