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
  const played = { leapt: false, asked, read: none, ended: false }

  test("playing the last chapter listed asks for the next one once", () => {
    const first = placed.slice(0, 1)
    expect(actsAt({ ...played, placed: first, before: 0, seconds: 1, asked: none })).toEqual({
      askNextAfter: "one",
      read: [],
    })
    expect(
      actsAt({ ...played, placed: first, before: 0, seconds: 1, asked: new Set(["one"]) })
        .askNextAfter
    ).toBeNull()
  })

  test("playing into the chapter appended last asks for the one after it", () => {
    const honeyCake = placedOf([
      { id: "honey-cake", title: "Honey Cake", startSeconds: 0, durationSeconds: 2652.8 },
      { id: "marigold", title: "The Marigold", startSeconds: 2652.8, durationSeconds: 2606.5 },
    ])
    const listening = { ...played, placed: honeyCake, asked: new Set(["honey-cake"]) }
    expect(actsAt({ ...listening, before: 2000, seconds: 2001 })).toEqual({
      askNextAfter: null,
      read: [],
    })
    expect(actsAt({ ...listening, before: 2652.5, seconds: 2652.9 })).toEqual({
      askNextAfter: "marigold",
      read: ["honey-cake"],
    })
  })

  test("a narration that has ended asks for no next chapter", () => {
    expect(
      actsAt({ ...played, placed, before: 119, seconds: 120, asked: none, ended: true })
        .askNextAfter
    ).toBeNull()
  })

  test("a chapter played across its end is read, once", () => {
    expect(actsAt({ ...played, placed, before: 99.5, seconds: 100.5 })).toEqual({
      askNextAfter: null,
      read: ["one"],
    })
    expect(
      actsAt({ ...played, placed, before: 99.5, seconds: 100.5, read: new Set(["one"]) }).read
    ).toEqual([])
  })

  test("a chapter ended between sparse ticks of a locked phone is read", () => {
    expect(actsAt({ ...played, placed, before: 40, seconds: 130 }).read).toEqual(["one"])
  })

  test("a leap past a chapter's end reads nothing", () => {
    expect(actsAt({ ...played, placed, before: 10, seconds: 101, leapt: true }).read).toEqual([])
    expect(actsAt({ ...played, placed, before: 101, seconds: 102 }).read).toEqual([])
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
