import Foundation

// THE VECTORS HERE ARE THE ONES THE SERVER'S OWN TEST USES, SO THE TWO ARE HELD TOGETHER.
//
// `readouts/tier/readout-tier.module.test.ts` names a climbing scale and a falling one and
// works every case out of them. The same two scales and the same expected answers are
// written here, so the port is proven to agree rather than assumed to. A case added there
// belongs here too; nothing but this file catches the two drifting apart.
enum ScaleChecks {
    static let CLIMBING = [
        Rung(at: 0, color: .black), Rung(at: 1, color: .red), Rung(at: 2, color: .yellow),
        Rung(at: 3, color: .green), Rung(at: 4, color: .blue),
    ]

    static let FALLING = [
        Rung(at: 100, color: .black), Rung(at: 10, color: .red), Rung(at: 1, color: .yellow),
        Rung(at: 0, color: .blue),
    ]

    static let ATTRIBUTES = [
        Rung(at: 0, color: .black), Rung(at: 0.25, color: .red), Rung(at: 0.5, color: .yellow),
        Rung(at: 1, color: .green), Rung(at: 2, color: .blue),
    ]

    private static func reaching(_ name: String, _ got: Tiered?, _ want: Tiered?) -> (
        String, Bool, String
    ) {
        (name, got == want, "got \(String(describing: got)), want \(String(describing: want))")
    }

    private static func at(_ tier: Tier, _ next: Tier?, _ climbed: Double?) -> Tiered {
        Tiered(tier: tier, nextTier: next, progress: climbed)
    }

    static func run() -> [(String, Bool, String)] {
        let one = [Rung(at: 1, color: .black)]
        let neither = [Rung(at: 5, color: .red), Rung(at: 5, color: .yellow)]
        return [
            (
                "a scale of fewer than two rungs says nothing about which way a reading runs",
                !ReadingScale.climbs(one) && !ReadingScale.falls(one)
                    && ReadingScale.tierAt(1, one) == nil,
                "one rung"
            ),
            (
                "a scale climbs or falls and never both",
                ReadingScale.climbs(CLIMBING) && !ReadingScale.falls(CLIMBING)
                    && ReadingScale.falls(FALLING) && !ReadingScale.climbs(FALLING),
                "the two scales the server's test names"
            ),
            (
                "a scale whose rungs neither climb nor fall is refused",
                !ReadingScale.climbs(neither) && !ReadingScale.falls(neither)
                    && ReadingScale.tierAt(7, neither) == nil,
                "two rungs at one number"
            ),
            (
                "a scale of no rungs at all is refused rather than read as black",
                ReadingScale.tierAt(1, []) == nil, "no rungs"
            ),
            (
                "a reading that is no finite number reaches no rung",
                ReadingScale.tierAt(Double.nan, CLIMBING) == nil
                    && ReadingScale.tierAt(Double.infinity, CLIMBING) == nil,
                "no rung reached"
            ),
            reaching(
                "a reading reaches the highest rung whose number it has gone over",
                ReadingScale.tierAt(1, CLIMBING), at(.red, .yellow, 0)),
            reaching(
                "a reading halfway between two rungs has climbed half the band",
                ReadingScale.tierAt(2.5, CLIMBING), at(.yellow, .green, 0.5)),
            reaching(
                "a reading on a rung has climbed none of the band above it",
                ReadingScale.tierAt(3, CLIMBING), at(.green, .blue, 0)),
            reaching(
                "a reading over every rung is on the highest and climbs toward none",
                ReadingScale.tierAt(9, CLIMBING), at(.blue, nil, nil)),
            reaching(
                "a reading exactly on the highest rung has no tier above it",
                ReadingScale.tierAt(4, CLIMBING), at(.blue, nil, nil)),
            reaching(
                "a reading between the black rung and the first stated rung is black",
                ReadingScale.tierAt(0.5, CLIMBING), at(.black, .red, 0.5)),
            reaching(
                "a reading on the black rung is black climbing toward the rung above",
                ReadingScale.tierAt(0, CLIMBING), at(.black, .red, 0)),
            reaching(
                "a reading under every rung is black and has climbed an unknown fraction",
                ReadingScale.tierAt(-2, CLIMBING), at(.black, .red, nil)),
            (
                "a reading under the first stated rung climbs toward that rung",
                ReadingScale.tierAt(0.174355, ATTRIBUTES).map {
                    $0.tier == .black && $0.nextTier == .red
                        && abs(($0.progress ?? 0) - 0.69742) < 0.00001
                } == true,
                String(describing: ReadingScale.tierAt(0.174355, ATTRIBUTES))
            ),
            reaching(
                "on a falling scale the rung reached is the first the reading has not gone under",
                ReadingScale.tierAt(240, FALLING), at(.black, .red, nil)),
            reaching(
                "a reading on the worst rung of a falling scale has come an unknown fraction",
                ReadingScale.tierAt(100, FALLING), at(.black, .red, nil)),
            reaching(
                "a falling reading halfway down its band has come half of it",
                ReadingScale.tierAt(55, FALLING), at(.red, .yellow, 0.5)),
            reaching(
                "a falling reading on the rung under it has come the whole band",
                ReadingScale.tierAt(10, FALLING), at(.red, .yellow, 1)),
            reaching(
                "a falling reading halfway down the band under that has come half of it",
                ReadingScale.tierAt(5.5, FALLING), at(.yellow, .blue, 0.5)),
            reaching(
                "a falling reading at the bottom of the last band has come the whole band",
                ReadingScale.tierAt(1, FALLING), at(.yellow, .blue, 1)),
            reaching(
                "a falling reading on the best rung has no tier above it",
                ReadingScale.tierAt(0, FALLING), at(.blue, nil, nil)),
            reaching(
                "a reading under every rung of a falling scale is on the best rung",
                ReadingScale.tierAt(-3, FALLING), at(.blue, nil, nil)),
            reaching(
                "a falling reading between the two worst rungs is on the worse one",
                ReadingScale.tierAt(24, FALLING), at(.red, .yellow, 0.8444444444444444)),
            reaching(
                "a falling reading just under a rung is on the rung below it",
                ReadingScale.tierAt(9, FALLING), at(.yellow, .blue, 0.1111111111111111)),
        ]
    }
}
