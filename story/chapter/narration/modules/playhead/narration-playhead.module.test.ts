import { describe, expect, test } from "bun:test"
import {
  actsAt,
  chapterAt,
  chapterStarts,
  placedOf,
} from "akasha/story/chapter/narration/modules/playhead/narration-playhead.module.code.ts"

const placed = placedOf([
  { id: "one", title: "One", startSeconds: 0, durationSeconds: 100 },
  { id: "two", title: "Two", startSeconds: 100, durationSeconds: null },
])

const none: ReadonlySet<string> = new Set()

describe("placedOf", () => {
  test("a chapter the speech workload lists without a start is dropped", () => {
    expect(placedOf([{ id: "x", title: "X" }, "y", null])).toEqual([])
    expect(placedOf({ chapters: [] })).toEqual([])
  })
})

describe("chapterAt", () => {
  test("the chapter playing is the last one started", () => {
    expect(chapterAt(placed, 50)?.id).toBe("one")
    expect(chapterAt(placed, 100)?.id).toBe("two")
  })
})

describe("actsAt", () => {
  test("playing the last chapter listed asks for the next one once", () => {
    expect(
      actsAt({ placed: placed.slice(0, 1), seconds: 1, asked: none, read: none, ended: false })
    ).toEqual({ askNextAfter: "one", read: [] })
    expect(
      actsAt({
        placed: placed.slice(0, 1),
        seconds: 1,
        asked: new Set(["one"]),
        read: none,
        ended: false,
      }).askNextAfter
    ).toBeNull()
  })

  test("a narration that has ended asks for no next chapter", () => {
    expect(
      actsAt({ placed, seconds: 120, asked: none, read: none, ended: true }).askNextAfter
    ).toBeNull()
  })

  test("a chapter the playhead has passed the end of is read, once", () => {
    expect(
      actsAt({ placed, seconds: 101, asked: new Set(["two"]), read: none, ended: false })
    ).toEqual({ askNextAfter: null, read: ["one"] })
    expect(
      actsAt({
        placed,
        seconds: 101,
        asked: new Set(["two"]),
        read: new Set(["one"]),
        ended: false,
      }).read
    ).toEqual([])
  })
})

describe("chapterStarts", () => {
  test("going back early in a chapter reaches the chapter before it", () => {
    expect(chapterStarts(placed, 101, -1)).toBe(0)
    expect(chapterStarts(placed, 150, -1)).toBe(100)
  })

  test("going on reaches the next chapter, and none past the last", () => {
    expect(chapterStarts(placed, 10, 1)).toBe(100)
    expect(chapterStarts(placed, 110, 1)).toBeNull()
  })
})
