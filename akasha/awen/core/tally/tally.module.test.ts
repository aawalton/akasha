import { describe, expect, test } from "bun:test"
import { TallyCatalogError } from "../tally-catalog/tally-catalog.module.code.ts"
import {
  computeTally,
  countParagraphs,
  countSentences,
  countWords,
  scoredTurnSpan,
} from "./tally.module.code.ts"
import {
  BOUNDARY_CATALOG,
  bTurn,
  CATALOG,
  hit,
  TURNS,
  total,
  turn,
} from "./tally.module.test-fixtures.ts"

describe("countWords", () => {
  test("counts only tokens holding a letter or a digit", () => {
    expect(countWords("one two three")).toBe(3)
    expect(countWords("— — —")).toBe(0)
    expect(countWords("a — b")).toBe(2)
    expect(countWords("chapter 12")).toBe(2)
  })
})

describe("countSentences", () => {
  test("counts each run of stops as one sentence", () => {
    expect(countSentences("One. Two! Three?")).toBe(3)
    expect(countSentences("Wait...")).toBe(1)
    expect(countSentences("no stop at all")).toBe(0)
  })
})

describe("countParagraphs", () => {
  test("counts each non-blank line", () => {
    expect(countParagraphs("one\n\ntwo\n\n\nthree")).toBe(3)
    expect(countParagraphs("   \n  ")).toBe(0)
  })
})

describe("scoredTurnSpan", () => {
  test("is the lowest and highest turn number given", () => {
    expect(scoredTurnSpan(TURNS)).toEqual({ from: 1, to: 2 })
  })

  test("is nothing where no turn is numbered", () => {
    expect(scoredTurnSpan([{ externalId: "a", text: "x" }])).toBe(null)
  })
})

describe("computeTally", () => {
  const result = computeTally(TURNS, CATALOG)

  test("carries the catalog's version through", () => {
    expect(result.catalogVersion).toBe(19)
  })

  test("measures each turn's length", () => {
    expect(turn(result, 0).words).toBe(22)
    expect(turn(result, 0).sentences).toBe(6)
    expect(turn(result, 0).paragraphs).toBe(2)
  })

  test("counts a pattern in the turn it fires in", () => {
    expect(hit(result, 0, "closing-dialect:ive-got-you").count).toBe(1)
    expect(hit(result, 1, "closing-dialect:ive-got-you").count).toBe(0)
    expect(hit(result, 1, "closing-dialect:stay").count).toBe(3)
  })

  test("a pattern rate is counted for every thousand words", () => {
    expect(hit(result, 0, "closing-dialect:stay").per1k).toBeCloseTo((1 / 22) * 1000, 6)
  })

  test("totals a pattern over every turn", () => {
    expect(total(result, "closing-dialect:stay").count).toBe(4)
    expect(total(result, "named-feeling:ribs").count).toBe(3)
  })

  test("totals a family over its patterns", () => {
    const families = new Map(result.cumulative.familyTotals.map((f) => [f.family, f.count]))
    expect(families.get("template")).toBe(9)
    expect(families.get("let-verb")).toBe(1)
    expect(families.get("telling")).toBe(3)
  })

  test("sums the run's length", () => {
    expect(result.cumulative.turns).toBe(2)
    expect(result.cumulative.words).toBe(48)
    expect(result.cumulative.sentences).toBe(9)
    expect(result.cumulative.paragraphs).toBe(4)
  })

  test("spreads the turn lengths", () => {
    expect(result.cumulative.turnLengthWords).toEqual({
      mean: 24,
      median: 24,
      min: 22,
      max: 26,
      stdev: 2,
    })
  })

  test("keeps the text each hit matched, capped", () => {
    const capped = computeTally(TURNS, CATALOG, { maxSamplesPerPattern: 1 })
    expect(total(capped, "closing-dialect:stay").samples).toEqual(["Stay"])
  })

  test("a turn given no catalog is still measured for its length", () => {
    const bare = computeTally(TURNS, null)
    expect(bare.catalogVersion).toBe(null)
    expect(bare.cumulative.words).toBe(48)
    expect(bare.cumulative.patternTotals).toEqual([])
    expect(turn(bare, 0).hits).toEqual([])
  })

  test("no boundary is read where the catalog carries no lens", () => {
    expect(turn(result, 0).boundary).toBe(undefined)
    expect(result.cumulative.boundary).toBe(undefined)
  })

  test("a catalog carrying a lens classifies each turn's edges", () => {
    const read = computeTally(
      [
        bTurn("You see the gate. Not yet.", 1),
        bTurn("You see the road. Not yet.", 2),
        bTurn('"Stay," she said. "Stay."', 3),
      ],
      BOUNDARY_CATALOG
    )
    expect(turn(read, 0).boundary?.headCategory).toBe("perception")
    expect(turn(read, 0).boundary?.closeState).toBe("poised")
    expect(turn(read, 0).boundary?.youInitial).toBe(true)
    expect(turn(read, 2).boundary?.headCategory).toBe("dialogue")
    expect(turn(read, 2).boundary?.youInitial).toBe(false)
    expect(read.cumulative.boundary?.head.longestRun?.length).toBe(2)
    expect(read.cumulative.boundary?.youInitial.longestRun?.category).toBe("you-initial")
  })

  test("a pattern with an unparseable regex is refused", () => {
    expect(() =>
      computeTally(TURNS, {
        catalogVersion: 1,
        patterns: [{ id: "bad", family: "template", regex: "([", provenance: "broken" }],
      })
    ).toThrow(TallyCatalogError)
  })
})
