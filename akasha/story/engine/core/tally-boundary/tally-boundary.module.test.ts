import { describe, expect, test } from "bun:test"
import type { BoundaryLens } from "../tally-catalog/tally-catalog.module.code.ts"
import { TallyCatalogError } from "../tally-catalog/tally-catalog.module.code.ts"
import {
  classifyTurnBoundary,
  compileBoundary,
  distribution,
  rollupBoundary,
} from "./tally-boundary.module.code.ts"

const LENS: BoundaryLens = {
  runThreshold: 2,
  head: {
    fallback: "ambient",
    screens: [
      { category: "dialogue", regex: '^\\s*"', provenance: "spoken head" },
      { category: "perception", regex: "\\byou\\s+see\\b", flags: "gi", provenance: "you see" },
    ],
  },
  close: {
    fallback: "resolved",
    screens: [{ category: "poised", regex: "not yet", flags: "i", provenance: "held" }],
  },
  youInitial: { regex: "^\\s*You\\b", provenance: "second person" },
}

describe("distribution", () => {
  test("an empty run is all zeroes", () => {
    expect(distribution([])).toEqual({ mean: 0, median: 0, min: 0, max: 0, stdev: 0 })
  })

  test("an odd count takes the middle value as the median", () => {
    expect(distribution([1, 5, 3])).toEqual({
      mean: 3,
      median: 3,
      min: 1,
      max: 5,
      stdev: expect.closeTo(1.632993, 5),
    })
  })

  test("an even count averages the two middle values", () => {
    expect(distribution([1, 2, 3, 4]).median).toBe(2.5)
  })

  test("the spread does not depend on the order given", () => {
    expect(distribution([4, 1, 3, 2])).toEqual(distribution([1, 2, 3, 4]))
  })
})

describe("compileBoundary", () => {
  test("a screen regex is compiled without the flags that carry state between tests", () => {
    const compiled = compileBoundary(LENS)
    const span = "You see the gate."
    expect(classifyTurnBoundary(span, compiled).headCategory).toBe("perception")
    expect(classifyTurnBoundary(span, compiled).headCategory).toBe("perception")
  })

  test("an unparseable screen regex is refused", () => {
    expect(() =>
      compileBoundary({
        ...LENS,
        close: { fallback: "resolved", screens: [{ category: "x", regex: "([", provenance: "p" }] },
      })
    ).toThrow(TallyCatalogError)
  })
})

describe("classifyTurnBoundary", () => {
  const compiled = compileBoundary(LENS)

  test("reads the first sentence as the head and the last as the close", () => {
    const read = classifyTurnBoundary("You see the gate. Rain fell. Not yet.", compiled)
    expect(read.headSample).toBe("You see the gate.")
    expect(read.closeSample).toBe("Not yet.")
    expect(read.headCategory).toBe("perception")
    expect(read.closeState).toBe("poised")
    expect(read.youInitial).toBe(true)
  })

  test("the first screen that fires wins", () => {
    expect(classifyTurnBoundary('"You see it," she said. Done.', compiled).headCategory).toBe(
      "dialogue"
    )
  })

  test("a span no screen fires on falls back", () => {
    const read = classifyTurnBoundary("Rain fell on the stone. It went on.", compiled)
    expect(read.headCategory).toBe("ambient")
    expect(read.closeState).toBe("resolved")
    expect(read.youInitial).toBe(false)
  })

  test("empty text has empty edges", () => {
    const read = classifyTurnBoundary("   ", compiled)
    expect(read.headSample).toBe("")
    expect(read.closeSample).toBe("")
  })

  test("a single sentence is both the head and the close", () => {
    const read = classifyTurnBoundary("You see the gate.", compiled)
    expect(read.headSample).toBe("You see the gate.")
    expect(read.closeSample).toBe("You see the gate.")
  })
})

describe("rollupBoundary", () => {
  const edge = (headCategory: string, closeState: string, youInitial: boolean) => ({
    headCategory,
    headSample: "",
    closeState,
    closeSample: "",
    youInitial,
  })
  const turns = [
    { boundary: edge("perception", "poised", true), turnNumber: 1, words: 10 },
    { boundary: edge("perception", "poised", true), turnNumber: 2, words: 20 },
    { boundary: edge("dialogue", "resolved", false), turnNumber: 3, words: 30 },
  ]

  test("the longest stretch of one category is found", () => {
    const rolled = rollupBoundary(turns, 2)
    expect(rolled.head.longestRun).toEqual({
      category: "perception",
      length: 2,
      fromIndex: 0,
      toIndex: 1,
      fromTurnNumber: 1,
      toTurnNumber: 2,
    })
  })

  test("only stretches reaching the threshold count as uniform", () => {
    expect(rollupBoundary(turns, 2).close.uniformRuns.map((r) => r.category)).toEqual(["poised"])
    expect(rollupBoundary(turns, 3).close.uniformRuns).toEqual([])
  })

  test("the threshold is carried through", () => {
    expect(rollupBoundary(turns, 5).runThreshold).toBe(5)
  })

  test("each category buckets the turns that fell in it", () => {
    const buckets = rollupBoundary(turns, 2).head.buckets
    expect(buckets.map((b) => [b.category, b.turns])).toEqual([
      ["perception", 2],
      ["dialogue", 1],
    ])
    expect(buckets[0]?.turnLengthWords.mean).toBe(15)
  })

  test("only the second-person stretches are rolled up", () => {
    const rolled = rollupBoundary(turns, 2)
    expect(rolled.youInitial.longestRun?.category).toBe("you-initial")
    expect(rolled.youInitial.uniformRuns).toHaveLength(1)
  })

  test("no turns leaves nothing to report", () => {
    const rolled = rollupBoundary([], 2)
    expect(rolled.head.longestRun).toBe(null)
    expect(rolled.youInitial.longestRun).toBe(null)
  })
})
