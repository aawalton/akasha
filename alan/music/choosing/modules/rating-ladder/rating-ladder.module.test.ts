import { describe, expect, test } from "bun:test"
import {
  isLiked,
  LIKED_RATINGS,
  MUSIC_RATINGS,
  type MusicRating,
  ratingRung,
} from "akasha/alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"

describe("MUSIC_RATINGS", () => {
  test("is the ladder the grade property type states, rather than a second list", () => {
    expect(MUSIC_RATINGS).toBe(gradeProperty.values)
  })
})

describe("ratingRung", () => {
  test("rises with every step along the ladder", () => {
    for (let nth = 1; nth < MUSIC_RATINGS.length; nth += 1) {
      const lower = MUSIC_RATINGS[nth - 1] as MusicRating
      const higher = MUSIC_RATINGS[nth] as MusicRating
      expect(ratingRung(higher)).toBeGreaterThan(ratingRung(lower))
    }
  })

  test("puts an ungraded thing below the worst grade", () => {
    expect(ratingRung(undefined)).toBeLessThan(ratingRung("F"))
  })

  test("reads a plus above its bare letter and a minus below", () => {
    expect(ratingRung("A+")).toBeGreaterThan(ratingRung("A"))
    expect(ratingRung("A-")).toBeLessThan(ratingRung("A"))
  })
})

describe("LIKED_RATINGS", () => {
  test("holds B- and every grade above it", () => {
    const liked: MusicRating[] = ["B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"]
    expect([...LIKED_RATINGS].sort()).toEqual(liked.sort())
  })

  test("holds nine of the sixteen grades", () => {
    expect(LIKED_RATINGS.size).toBe(9)
  })
})

describe("isLiked", () => {
  test("likes B- and everything above it", () => {
    expect(isLiked("B-")).toBe(true)
    expect(isLiked("B+")).toBe(true)
    expect(isLiked("S+")).toBe(true)
  })

  test("does not like C+ or anything below it", () => {
    expect(isLiked("C+")).toBe(false)
    expect(isLiked("C")).toBe(false)
    expect(isLiked("F")).toBe(false)
  })

  test("does not like what Alan has not graded", () => {
    expect(isLiked(undefined)).toBe(false)
  })
})
