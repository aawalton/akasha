import { describe, expect, test } from "bun:test"
import {
  declaresPointsSource,
  personasDeclaringPointsSource,
  TOWER_WORDS_POINTS_SOURCE,
} from "./points-source-declarers.module.code.ts"

describe("declaresPointsSource", () => {
  test("counts a source declared external", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "external", pointsSource: TOWER_WORDS_POINTS_SOURCE },
        TOWER_WORDS_POINTS_SOURCE
      )
    ).toBe(true)
  })

  test("passes over the same source declared some other way", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "windowed", pointsSource: TOWER_WORDS_POINTS_SOURCE },
        TOWER_WORDS_POINTS_SOURCE
      )
    ).toBe(false)
  })

  test("passes over an external row naming another source", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "external", pointsSource: "words-read" },
        TOWER_WORDS_POINTS_SOURCE
      )
    ).toBe(false)
  })
})

describe("personasDeclaringPointsSource", () => {
  test("keeps only the rows declaring the source", () => {
    const rows = [
      { id: "1", pointsSourceKind: "external", pointsSource: TOWER_WORDS_POINTS_SOURCE },
      { id: "2", pointsSourceKind: "external", pointsSource: "words-read" },
      { id: "3", pointsSourceKind: "windowed", pointsSource: TOWER_WORDS_POINTS_SOURCE },
    ]
    const found = personasDeclaringPointsSource(rows, TOWER_WORDS_POINTS_SOURCE)
    expect(found.map((r) => r.id)).toEqual(["1"])
  })
})
