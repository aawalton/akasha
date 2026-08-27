import { describe, expect, test } from "bun:test"
import { computeTally } from "../tally"
import { CATALOG, hit, TURNS, turn } from "./fixtures"

describe("computeTally — per-turn counts", () => {
  const result = computeTally(TURNS, CATALOG)

  test("turn 1 structural stats", () => {
    expect(turn(result, 0).words).toBe(22)
    expect(turn(result, 0).paragraphs).toBe(2)
  })

  test("turn 1 pattern counts match the planted prose", () => {
    expect(hit(result, 0, "closing-dialect:stay").count).toBe(1)
    expect(hit(result, 0, "closing-dialect:ive-got-you").count).toBe(1)
    expect(hit(result, 0, "closing-dialect:im-not-going-anywhere").count).toBe(1)
    expect(hit(result, 0, "closing-dialect:there-bare").count).toBe(1)
    expect(hit(result, 0, "unhurried").count).toBe(1)
    expect(hit(result, 0, "lyric-engine:let").count).toBe(1)
    expect(hit(result, 0, "named-feeling:ribs").count).toBe(1)
    expect(hit(result, 0, "way-x-does").count).toBe(0)
  })

  test("turn 2 pattern counts — stay screens 3, way-x 1, ribs 2", () => {
    expect(turn(result, 1).words).toBe(26)
    expect(hit(result, 1, "closing-dialect:stay").count).toBe(3)
    expect(hit(result, 1, "way-x-does").count).toBe(1)
    expect(hit(result, 1, "named-feeling:ribs").count).toBe(2)
    expect(hit(result, 1, "closing-dialect:there-bare").count).toBe(0)
    expect(hit(result, 1, "unhurried").count).toBe(0)
  })

  test("per-1k rate is count / words * 1000", () => {
    expect(hit(result, 1, "closing-dialect:stay").per1k).toBeCloseTo((3 / 26) * 1000, 6)
  })

  test("every catalog pattern yields a hit entry (clean is distinguishable from unchecked)", () => {
    expect(turn(result, 0).hits).toHaveLength(CATALOG.patterns.length)
  })

  test("sample spans are the verbatim matched text", () => {
    expect(hit(result, 1, "closing-dialect:stay").samples).toEqual(["Stay", "stay", "stay"])
    expect(hit(result, 0, "named-feeling:ribs").samples).toEqual(["below her ribs"])
  })
})
