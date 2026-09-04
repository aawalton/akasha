import { describe, expect, test } from "bun:test"
import {
  isLiked,
  LIKED_RATINGS,
  MUSIC_RATINGS,
  type MusicRating,
  ratingRung,
} from "./rating-ladder.module.code.ts"

describe("MUSIC_RATINGS", () => {
  test("runs from F up to S+ in sixteen rungs", () => {
    expect(MUSIC_RATINGS.length).toBe(16)
    expect(MUSIC_RATINGS[0]).toBe("F")
    expect(MUSIC_RATINGS[15]).toBe("S+")
  })

  test("names each grade once", () => {
    expect(new Set(MUSIC_RATINGS).size).toBe(16)
  })

  test("orders the ladder worst to best", () => {
    expect([...MUSIC_RATINGS]).toEqual([
      "F",
      "D-",
      "D",
      "D+",
      "C-",
      "C",
      "C+",
      "B-",
      "B",
      "B+",
      "A-",
      "A",
      "A+",
      "S-",
      "S",
      "S+",
    ])
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
