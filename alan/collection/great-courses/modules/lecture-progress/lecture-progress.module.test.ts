import { describe, expect, test } from "bun:test"
import {
  courseOf,
  type Lecture,
  watched,
} from "akasha/alan/collection/great-courses/modules/lecture-progress/lecture-progress.module.code.ts"

function lecture(index: number, seconds: number): Lecture {
  return { id: `L${index}`, index, seconds, watchedAt: 0.95 }
}

const LECTURES = [lecture(2, 1200), lecture(1, 1800), lecture(3, 600)]

describe("watched", () => {
  test("a lecture played to the site's mark is watched", () => {
    expect(watched(lecture(1, 1000), 950)).toBe(true)
  })

  test("a lecture short of the mark is not watched", () => {
    expect(watched(lecture(1, 1000), 900)).toBe(false)
  })

  test("a lecture within ten seconds of its end is watched", () => {
    expect(watched({ ...lecture(1, 100), watchedAt: 1 }, 90)).toBe(true)
  })
})

describe("courseOf", () => {
  test("the next lecture is the first in order not watched", () => {
    expect(courseOf(LECTURES, { L1: 1800 }).next).toBe(2)
  })

  test("a course with every lecture watched has no next lecture", () => {
    expect(courseOf(LECTURES, { L1: 1800, L2: 1200, L3: 600 }).next).toBeNull()
  })

  test("the length is the sum of the lectures in minutes", () => {
    expect(courseOf(LECTURES, {}).lengthMinutes).toBe(60)
  })

  test("a watched lecture counts whole and a started one counts what was played", () => {
    expect(courseOf(LECTURES, { L1: 1750, L2: 300 }).progressMinutes).toBe(35)
  })

  test("what was played never counts past a lecture's length", () => {
    expect(courseOf([lecture(1, 600)], { L1: 9000 }).progressMinutes).toBe(10)
  })

  test("minutes are kept to the hundredth", () => {
    expect(courseOf([lecture(1, 100)], { L1: 10 }).progressMinutes).toBe(0.17)
  })
})
