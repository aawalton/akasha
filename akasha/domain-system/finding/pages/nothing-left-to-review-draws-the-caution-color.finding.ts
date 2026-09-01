import type { Finding } from "../finding.page-type.ts"

export const nothingLeftToReviewDrawsTheCautionColor = {
  id: "01a05b7e-984e-7bdb-9caa-b174b30cefa0",
  pageTypeSlug: "finding",
  slug: "nothing-left-to-review-draws-the-caution-color",
  domainSlug: "readout-scale/backlog-count",
  claim:
    "`backlog-count` states `yellowAt: 0`, and the ring turns a tier on at or above its rung, so every count from zero up is yellow and no count is ever uncolored. The best state the readout has draws the same caution color as a small backlog, beside the words `All reviewed!` and a party emoji. Any scale stating a zero rung has this, because zero is not a threshold a count can fall below.",
  evidence:
    "`backlog-count.readout-scale.ts:8-11` states yellowAt 0, orangeAt 11, redAt 21, blackAt 31.\n\n`categorize-ring.ios-component.swift.swift:12-18` tests `if let yellowAt, count >= yellowAt { return .yellow }` last, after black, red and orange, and returns nil only when no rung matched. With yellowAt 0 that nil is unreachable for a non-negative count, and the relay refuses a negative one (`readout-relay.module.code.ts:27`, `z.number().int().nonnegative()`).\n\nRunning those rules over the real page values: 0 -> yellow, 10 -> yellow, 11 -> orange, 21 -> red, 31 -> black. Only the 0 case is a surprise.\n\nThe grey `Color(.systemGray5)` at `categorize-ring.ios-component.swift.swift:64-69` is reached only when there is no reading or no scale at all, never by a reading of zero.\n\nAt the same time `CategorizeTile` at :71-75 draws `RingNoneLeft` from `noneLeftWords` and `noneLeftEmoji` exactly when the count is 0, so the tile says `All reviewed!` and drew the caution color to say it.\n\nWhat to do is a judgement rather than a fact: dropping the yellow rung leaves 0-10 uncolored, and moving it to 1 keeps the band while freeing zero.",
} as const satisfies Finding
