import { describe, expect, test } from "bun:test"
import {
  ANIME_EPISODE_POINTS_SOURCE,
  CHESS_PRACTICE_POINTS_SOURCE,
  declaresPointsSource,
  GBWW_CHAPTER_POINTS_SOURCE,
  personasDeclaringPointsSource,
  STORY_WORDS_POINTS_SOURCE,
  TOWER_WORDS_POINTS_SOURCE,
  WORDS_READ_POINTS_SOURCE,
} from "./points-source-declarers"

describe("declaresPointsSource", () => {
  test("an external row naming the source declares it", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "external", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
        CHESS_PRACTICE_POINTS_SOURCE
      )
    ).toBe(true)
  })

  test("a row naming another source does not declare it", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "external", pointsSource: "owned-project-completions" },
        CHESS_PRACTICE_POINTS_SOURCE
      )
    ).toBe(false)
  })

  test("a windowed row naming the source belongs to the engine, not to a pass", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "windowed", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
        CHESS_PRACTICE_POINTS_SOURCE
      )
    ).toBe(false)
  })

  test("an unavailable row is metered by nothing", () => {
    expect(
      declaresPointsSource(
        { pointsSourceKind: "unavailable", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
        CHESS_PRACTICE_POINTS_SOURCE
      )
    ).toBe(false)
  })

  test("an absent or null recipe declares no source", () => {
    expect(declaresPointsSource({}, CHESS_PRACTICE_POINTS_SOURCE)).toBe(false)
    expect(
      declaresPointsSource(
        { pointsSourceKind: null, pointsSource: null },
        CHESS_PRACTICE_POINTS_SOURCE
      )
    ).toBe(false)
  })
})

describe("personasDeclaringPointsSource", () => {
  const rows = [
    { slug: "erin", pointsSourceKind: "external", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
    { slug: "aria", pointsSourceKind: "external", pointsSource: STORY_WORDS_POINTS_SOURCE },
    { slug: "nimue", pointsSourceKind: "external", pointsSource: "owned-project-completions" },
    { slug: "eppie", pointsSourceKind: "windowed", pointsSource: "song-listen" },
  ]

  test("selects only the personas declaring the named source", () => {
    expect(
      personasDeclaringPointsSource(rows, CHESS_PRACTICE_POINTS_SOURCE).map((r) => r.slug)
    ).toEqual(["erin"])
  })

  test("a source no persona declares selects nobody", () => {
    expect(personasDeclaringPointsSource(rows, TOWER_WORDS_POINTS_SOURCE)).toEqual([])
    expect(personasDeclaringPointsSource([], WORDS_READ_POINTS_SOURCE)).toEqual([])
  })

  test("returns every declarer rather than the first", () => {
    const shared = [
      { slug: "erin", pointsSourceKind: "external", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
      { slug: "second", pointsSourceKind: "external", pointsSource: CHESS_PRACTICE_POINTS_SOURCE },
    ]
    expect(
      personasDeclaringPointsSource(shared, CHESS_PRACTICE_POINTS_SOURCE).map((r) => r.slug)
    ).toEqual(["erin", "second"])
  })

  test("every marker is a distinct word", () => {
    const markers = [
      STORY_WORDS_POINTS_SOURCE,
      CHESS_PRACTICE_POINTS_SOURCE,
      TOWER_WORDS_POINTS_SOURCE,
      WORDS_READ_POINTS_SOURCE,
      ANIME_EPISODE_POINTS_SOURCE,
      GBWW_CHAPTER_POINTS_SOURCE,
    ]
    expect(new Set(markers).size).toBe(markers.length)
  })
})
