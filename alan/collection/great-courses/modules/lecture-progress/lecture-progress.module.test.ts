import { describe, expect, test } from "bun:test"
import {
  finishedThrough,
  type Lecture,
  placeOf,
} from "akasha/alan/collection/great-courses/modules/lecture-progress/lecture-progress.module.code.ts"

function lecture(index: number, seconds: number): Lecture {
  return { id: `L${index}`, index, seconds }
}

const LECTURES = [lecture(2, 1200), lecture(1, 1800), lecture(3, 600)]

describe("placeOf", () => {
  test("the next lecture is the first past the page's progress", () => {
    expect(placeOf(LECTURES, 30).next).toBe(2)
  })

  test("a course whose progress covers every lecture has no next lecture", () => {
    expect(placeOf(LECTURES, 60).next).toBeNull()
  })

  test("the length is the sum of the lectures in minutes", () => {
    expect(placeOf(LECTURES, 0).lengthMinutes).toBe(60)
  })

  test("a lecture partly watched counts nothing", () => {
    expect(placeOf(LECTURES, 45).progressMinutes).toBe(30)
  })

  test("progress kept to the hundredth still covers its lecture", () => {
    expect(placeOf([lecture(1, 100), lecture(2, 100)], 1.67).lecturesWatched).toBe(1)
  })

  test("a course counts its lectures and the lectures watched", () => {
    const course = placeOf(LECTURES, 30)
    expect([course.lecturesWatched, course.lectures]).toEqual([1, 3])
  })
})

describe("finishedThrough", () => {
  test("a finished lecture counts its whole length", () => {
    expect(finishedThrough(LECTURES, 0, 1).progressMinutes).toBe(30)
  })

  test("a lecture finished ahead counts every lecture before it", () => {
    const course = finishedThrough(LECTURES, 0, 3)
    expect([course.lecturesWatched, course.progressMinutes]).toEqual([3, 60])
  })

  test("a lecture finished behind the page's progress leaves the progress", () => {
    expect(finishedThrough(LECTURES, 50, 1).progressMinutes).toBe(50)
  })
})
