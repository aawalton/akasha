import { describe, expect, test } from "bun:test"
import { computeTally } from "../tally"
import { CATALOG, TURNS, total } from "./fixtures"

describe("computeTally — cumulative rollup", () => {
  const result = computeTally(TURNS, CATALOG)

  test("catalogVersion is echoed", () => {
    expect(result.catalogVersion).toBe(19)
  })

  test("cumulative structural totals", () => {
    expect(result.cumulative.turns).toBe(2)
    expect(result.cumulative.words).toBe(48)
    expect(result.cumulative.paragraphs).toBe(4)
  })

  test("turn-length distribution over [22, 26]", () => {
    const d = result.cumulative.turnLengthWords
    expect(d.mean).toBe(24)
    expect(d.median).toBe(24)
    expect(d.min).toBe(22)
    expect(d.max).toBe(26)
    expect(d.stdev).toBe(2)
  })

  test("pattern totals sum across turns", () => {
    expect(total(result, "closing-dialect:stay").count).toBe(4)
    expect(total(result, "named-feeling:ribs").count).toBe(3)
    expect(total(result, "way-x-does").count).toBe(1)
    expect(total(result, "closing-dialect:there-bare").count).toBe(1)
  })

  test("family totals aggregate the pattern families", () => {
    const fam = (f: string) => result.cumulative.familyTotals.find((x) => x.family === f)?.count
    expect(fam("template")).toBe(9)
    expect(fam("let-verb")).toBe(1)
    expect(fam("telling")).toBe(3)
  })
})
