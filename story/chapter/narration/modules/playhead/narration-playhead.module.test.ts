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
  const asked = new Set(["two"])

  test("playing the last chapter listed asks for the next one once", () => {
    const first = placed.slice(0, 1)
    expect(
      actsAt({ placed: first, before: 0, seconds: 1, asked: none, read: none, ended: false })
    ).toEqual({ askNextAfter: "one", read: [] })
    expect(
      actsAt({
        placed: first,
        before: 0,
        seconds: 1,
        asked: new Set(["one"]),
        read: none,
        ended: false,
      }).askNextAfter
    ).toBeNull()
  })

  test("a narration that has ended asks for no next chapter", () => {
    expect(
      actsAt({ placed, before: 119, seconds: 120, asked: none, read: none, ended: true })
        .askNextAfter
    ).toBeNull()
  })

  test("a chapter played across its end is read, once", () => {
    expect(
      actsAt({ placed, before: 99.5, seconds: 100.5, asked, read: none, ended: false })
    ).toEqual({ askNextAfter: null, read: ["one"] })
    expect(
      actsAt({ placed, before: 99.5, seconds: 100.5, asked, read: new Set(["one"]), ended: false })
        .read
    ).toEqual([])
  })

  test("a leap past a chapter's end reads nothing", () => {
    expect(
      actsAt({ placed, before: 10, seconds: 101, asked, read: none, ended: false }).read
    ).toEqual([])
    expect(
      actsAt({ placed, before: 101, seconds: 102, asked, read: none, ended: false }).read
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
