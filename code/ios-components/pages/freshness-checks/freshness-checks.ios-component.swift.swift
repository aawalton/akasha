import Foundation

// WHAT THE FRESHNESS TILE WORKS OUT, WHICH IS THE ONE PART OF IT A HARNESS CAN RUN.
//
// `FreshnessProvider.getTimeline` cannot be called from here, and the store it reads is the
// phone's own. So the rule was lifted into `FreshnessReading.reading`, which takes the two
// stores as plain values, and that is what these assertions run. What stays unrun is the
// wiring that fetches those two values out of `UserDefaults`.
//
// The case worth holding is the left-behind moment: a feed whose tile is gone keeps its
// moment forever, and before this rule that moment was the answer the tile drew.
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
        let gone = "/api/taken-off-the-phone"

        let taken = [live: ago(300), alsoLive: ago(900), gone: ago(950_400)]
        let kept = notes([(live, 100), (live, 3600), (alsoLive, 200)])
        let read = FreshnessReading.reading(taken: taken, kept: kept, now: now)

        let onlyGone = FreshnessReading.reading(
            taken: [gone: ago(950_400)], kept: notes([(live, 100)]), now: now)
        let nothingNoted = FreshnessReading.reading(taken: taken, kept: [], now: now)
        let stale = notes([(live, 100_000)])
        let allStale = FreshnessReading.reading(taken: taken, kept: stale, now: now)

        return [
            (
                "a feed no tile asked for within the day is left out of the count",
                read.tiles == 2, String(read.tiles)
            ),
            (
                "the oldest reading is the oldest of the feeds still asked for",
                read.stalest == ago(900), String(describing: read.stalest)
            ),
            (
                "the tile names the feed that oldest reading came from",
                read.stalestName == "surplus", String(describing: read.stalestName)
            ),
            (
                "a feed left behind does not become the oldest however old it is",
                read.stalest != ago(950_400), String(describing: read.stalest)
            ),
            (
                "every reload noted within the day is counted whatever feed it was for",
                read.reloads == 3, String(read.reloads)
            ),
            (
                "the band runs from the feed reloaded fewest to the feed reloaded most",
                read.fewest == 1 && read.most == 2, "\(read.fewest)-\(read.most)"
            ),
            (
                "a moment held for a feed nothing asked for leaves no age at all",
                onlyGone.stalest == nil && onlyGone.tiles == 0,
                String(describing: onlyGone.stalest)
            ),
            (
                "a feed asked for but holding no moment is no age",
                onlyGone.stalestName == nil, String(describing: onlyGone.stalestName)
            ),
            (
                "nothing noted leaves every moment out rather than letting them all in",
                nothingNoted.tiles == 0 && nothingNoted.stalest == nil,
                String(nothingNoted.tiles)
            ),
            (
                "a note older than the day counts for nothing",
                allStale.tiles == 0 && allStale.reloads == 0, String(allStale.reloads)
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
