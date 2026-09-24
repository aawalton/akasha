import Foundation

// THE CATEGORIZE BODIES ARE THE ONES `answerReadoutAdmittedBy` SENDS FOR THE UNREVIEWED READOUT.
//
// The readout page states its label, unit, scale and none-left words, and the route sends each
// beside the count. A readout holding no reading is answered 503, which the feed reads as
// unreachable, so the categorize tile carries no `readingHeld` and has no no-signal light.
enum CategorizeChecks {
    static let SCALE = #"{"orangeAt":11,"redAt":21,"blackAt":31,"yellowAt":1}"#

    static func body(_ unreviewed: String) -> String {
        #"{"unreviewed":\#(unreviewed),"label":"Unreviewed","unit":"transactions","scale":\#(SCALE),"noneLeftWords":"All reviewed!","noneLeftEmoji":"🎉"}"#
    }

    static func decode(_ body: Data) -> Categorization? {
        try? JSONDecoder().decode(Categorization.self, from: body)
    }

    static func state(_ json: String) -> FeedState<Categorization> {
        guard let payload = decode(Data(json.utf8)) else { return .neverLoaded }
        return .loaded(payload)
    }

    static let REJECTED: [(String, String)] = [
        (
            "a categorize body missing unreviewed is rejected rather than read as zero",
            #"{"label":"Unreviewed","noneLeftWords":"All reviewed!"}"#
        ),
        ("a categorize body carrying the old uncategorized key is rejected", #"{"uncategorized":19}"#),
        ("a non-integer categorize count is rejected", body(#""nineteen""#)),
        ("the no-reading body is rejected as a categorize body", #"{"ok":false,"error":"No reading."}"#),
        (
            "a categorize scale missing a rung is rejected",
            #"{"unreviewed":19,"scale":{"redAt":21,"blackAt":31}}"#
        ),
    ]

    static func run() -> [(String, Bool, String)] {
        let served = categorizeReading(state(body("19")))
        let zero = categorizeReading(state(body("0")))
        let cache = Data(body("19").utf8)
        let refused = FeedResolution.resolve(outcome: .refused, cached: cache, decode: decode)
        let noReading = FeedResolution.resolve(outcome: .unreachable, cached: cache, decode: decode)

        return [
            (
                "a well-formed categorize body decodes to its values",
                served?.left == 19 && served?.label == "Unreviewed"
                    && served?.scale == BacklogScale(yellowAt: 1, orangeAt: 11, redAt: 21, blackAt: 31)
                    && served?.noneLeftWords == "All reviewed!" && served?.noneLeftEmoji == "🎉",
                String(describing: served)
            ),
            (
                "a categorize count is colored by the scale the feed sent",
                served.flatMap { $0.scale?.tier(for: $0.left) } == .orange,
                "19 against orange at 11"
            ),
            (
                "a categorize body carrying a zero count decodes rather than failing",
                zero?.left == 0 && zero?.noneLeftWords == "All reviewed!",
                String(describing: zero)
            ),
            (
                "a categorize body with only its count decodes",
                decode(Data(#"{"unreviewed":19}"#.utf8))?.unreviewed == 19,
                "no label, scale or none-left words"
            ),
        ] + REJECTED.map { name, json in (name, decode(Data(json.utf8)) == nil, json) } + [
            (
                "a categorize tile never carried in reads nothing",
                categorizeReading(FeedState<Categorization>.neverLoaded) == nil, "neverLoaded"
            ),
            (
                "a refused categorize tile reads nothing",
                categorizeReading(FeedState<Categorization>.refused) == nil, "refused"
            ),
            (
                "a refused categorize feed does not fall back to its cached count",
                categorizeReading(refused.state) == nil && refused.cacheWrite == nil,
                "refused over a cached 19"
            ),
            (
                "a categorize feed with no reading falls back to its cached count",
                categorizeReading(noReading.state)?.left == 19,
                String(describing: categorizeReading(noReading.state))
            ),
        ]
    }
}
