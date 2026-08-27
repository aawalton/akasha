import { describe, expect, it } from "bun:test"
import type { ReaderPositionAnchor } from "./reader-prose-body"
import { readEndContentFraction } from "./use-read-end-on-scroll"

function anchor(fraction: number): ReaderPositionAnchor {
  return { fractionAt: () => fraction, scrollTopFor: () => 0, scrollToBlock: () => {} }
}

describe("readEndContentFraction", () => {
  it("uses the anchor's char fraction on the virtualized path", () => {
    expect(
      readEndContentFraction({ scrollTop: 9000, scrollable: 10000, anchor: anchor(0.83) })
    ).toBe(0.83)
  })

  it("reports fully complete on the virtualized path when the anchor pins the end", () => {
    expect(readEndContentFraction({ scrollTop: 9998, scrollable: 10000, anchor: anchor(1) })).toBe(
      1
    )
  })

  it("uses the pixel fraction on the non-virtualized path (no anchor)", () => {
    expect(readEndContentFraction({ scrollTop: 500, scrollable: 1000, anchor: null })).toBe(0.5)
  })

  it("reads a body that fits the viewport (no scroll room, no anchor) as complete", () => {
    expect(readEndContentFraction({ scrollTop: 0, scrollable: 0, anchor: null })).toBe(1)
    expect(readEndContentFraction({ scrollTop: 0, scrollable: 4, anchor: null })).toBe(1)
  })

  it("does NOT treat a scrollable body as fitting just because it is at the top", () => {
    expect(readEndContentFraction({ scrollTop: 0, scrollable: 5000, anchor: null })).toBe(0)
  })
})
