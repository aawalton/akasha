import { describe, expect, test } from "bun:test"
import {
  isLiked,
  LIKED_RATINGS,
} from "akasha/alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

describe("LIKED_RATINGS", () => {
  test("holds B- and every grade above it", () => {
    const liked: Grade[] = ["B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"]
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
