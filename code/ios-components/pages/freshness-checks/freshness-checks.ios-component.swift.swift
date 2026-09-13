import Foundation

// WHAT THE FRESHNESS TILE WORKS OUT, WHICH IS THE ONE PART OF IT A HARNESS CAN RUN.
//
// `FreshnessProvider.getTimeline` cannot be called from here, and the store it reads is the
// phone's own. So the rule was lifted into `FreshnessReading.reading`, which takes the two
// stores as plain values, and that is what these assertions run. What stays unrun is the
// wiring that fetches those two values out of `UserDefaults`.
//
// The case worth holding is the tile taken off the phone. iOS goes on asking such a tile for
// a picture, so its reading stays fresh and its reloads stay noted, and under either of those
// as the test it was still the answer the tile drew. The list of placed kinds is the only
// thing that says it is gone, and turning that list into feeds is what these run.
enum FreshnessChecks {
    static let now = Date(timeIntervalSince1970: 1_760_000_000)

    private static func ago(_ seconds: Double) -> Date {
        now.addingTimeInterval(-seconds)
    }

    private static func notes(_ each: [(String, Double)]) -> [String] {
        each.map { ReloadLog.spelling(ReloadLog.Noted(path: $0.0, at: ago($0.1))) }
    }

    static func run() -> [(String, Bool, String)] {
        let live = "/api/claude-usage"
        let alsoLive = "/api/surplus"
        let gone = "/api/categorization"

        let table = [
            "ClaudeUsageWidget": live, "SurplusWidget": alsoLive, "CategorizeWidget": gone,
        ]
        let asking = FeedKinds.asking(
            placed: ["ClaudeUsageWidget", "SurplusWidget"], table: table)

        let taken = [live: ago(300), alsoLive: ago(900), gone: ago(1_560)]
        let kept = notes([(live, 100), (live, 3600), (alsoLive, 200), (gone, 150)])
        let read = FreshnessReading.reading(taken: taken, kept: kept, asking: asking, now: now)

        let noneUp = FreshnessReading.reading(taken: taken, kept: kept, asking: [], now: now)
        let noMoment = FreshnessReading.reading(taken: [:], kept: kept, asking: asking, now: now)
        let stale = notes([(live, 100_000), (alsoLive, 100_000)])
        let allStale = FreshnessReading.reading(
            taken: taken, kept: stale, asking: asking, now: now)

        return [
            (
                "a tile the phone says is placed asks for the feed the table pairs with it",
                asking == Set([live, alsoLive]), String(describing: asking.sorted())
            ),
            (
                "a tile no longer placed asks for nothing however fresh its reading is",
                !asking.contains(gone), String(describing: asking.sorted())
            ),
            (
                "a kind the table has never paired asks for nothing rather than refusing",
                FeedKinds.asking(placed: ["NeverRanWidget"], table: table).isEmpty, "no feed"
            ),
            (
                "a feed no placed tile asks for is left out of the count",
                read.tiles == 2, String(read.tiles)
            ),
            (
                "the oldest reading is the oldest of the feeds a placed tile asks for",
                read.stalest == ago(900), String(describing: read.stalest)
            ),
            (
                "the tile names the feed that oldest reading came from",
                read.stalestName == "surplus", String(describing: read.stalestName)
            ),
            (
                "a feed left behind does not become the oldest though its moment is older",
                read.stalestName != "categorization", String(describing: read.stalestName)
            ),
            (
                "a reload noted for a feed no placed tile asks for is not counted",
                read.reloads == 3, String(read.reloads)
            ),
            (
                "the band runs from the feed reloaded fewest to the feed reloaded most",
                read.fewest == 1 && read.most == 2, "\(read.fewest)-\(read.most)"
            ),
            (
                "no tile placed leaves no age and no count rather than every feed let in",
                noneUp.tiles == 0 && noneUp.stalest == nil && noneUp.reloads == 0,
                String(noneUp.tiles)
            ),
            (
                "a feed asked for but holding no moment is no age",
                noMoment.stalest == nil && noMoment.stalestName == nil,
                String(describing: noMoment.stalest)
            ),
            (
                "a note older than the day counts for nothing",
                allStale.reloads == 0 && allStale.fewest == 0, String(allStale.reloads)
            ),
            (
                "a feed named by its path is named by the last part of that path",
                Freshness.naming("/api/attribute-stoplights") == "attribute-stoplights",
                Freshness.naming("/api/attribute-stoplights")
            ),
            (
                "two feeds taken at one moment are told apart rather than chosen between",
                Freshness.stalest(["/api/b": ago(60), "/api/a": ago(60)])?.path == "/api/a",
                String(describing: Freshness.stalest(["/api/b": ago(60), "/api/a": ago(60)])?.path)
            ),
            (
                "a note the tile made for itself is counted as the tile's own",
                ReloadLog.perPath(
                    ReloadLog.since(notes([(FreshnessReading.OWN_PATH, 60)]), ago(3600))
                )[FreshnessReading.OWN_PATH] == 1,
                "the tile notes itself"
            ),
            (
                "the notes kept are the last two hundred and forty rather than every one",
                ReloadLog.noting(
                    Array(repeating: "x|1", count: 240), ReloadLog.Noted(path: live, at: now)
                ).count == 240,
                "two hundred and forty"
            ),
        ]
    }
}
