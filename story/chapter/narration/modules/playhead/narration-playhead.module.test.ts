import { describe, expect, test } from "bun:test"
import {
  actsAt,
  chapterAt,
  chapterStarts,
  placedOf,
  progressAt,
  sameSpoken,
  spokenAt,
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

describe("progressAt", () => {
  const marked = placedOf([
    {
      id: "one",
      title: "One",
      startSeconds: 0,
      durationSeconds: 100,
      marks: [
        [0, 40],
        [3, 40],
        [30, 55],
        [60, 70],
      ],
    },
    { id: "two", title: "Two", startSeconds: 100, durationSeconds: null, marks: [[100, 0]] },
  ])
  const lengths = new Map([
    ["one", 80],
    ["two", 500],
  ])
  const lengthOf = (id: string): number | null => lengths.get(id) ?? null
  const at = (seconds: number, written: ReadonlyMap<string, number> = new Map()) =>
    progressAt({ placed: marked, seconds, written, lengthOf })

  test("progress is the word the segment playing begins at", () => {
    expect(at(45)).toEqual({ id: "one", ownProgress: 55 })
  })

  test("progress never goes back past what is written", () => {
    expect(at(45, new Map([["one", 60]]))).toBeNull()
    expect(at(65, new Map([["one", 60]]))).toEqual({ id: "one", ownProgress: 70 })
  })

  test("progress stops short of the chapter's length, which only its end reaches", () => {
    const short = new Map([["one", 65]])
    expect(
      progressAt({
        placed: marked,
        seconds: 65,
        written: new Map(),
        lengthOf: (id) => short.get(id) ?? null,
      })
    ).toEqual({
      id: "one",
      ownProgress: 64,
    })
  })

  test("a chapter's opening word moves nothing", () => {
    expect(at(100.5)).toBeNull()
  })

  test("a playhead before any mark makes no progress", () => {
    expect(progressAt({ ...{ placed, seconds: 50, written: new Map(), lengthOf } })).toBeNull()
  })
})

describe("spokenAt", () => {
  const marked = placedOf([
    {
      id: "one",
      title: "One",
      startSeconds: 0,
      durationSeconds: 100,
      marks: [
        [0, 0],
        [2, 0],
        [9, 12],
        [30, 20],
      ],
    },
  ])

  test("the sentence spoken runs from its own word to the next sentence's", () => {
    expect(spokenAt(marked, 1)).toEqual({ pageId: "one", from: 0, to: 12 })
    expect(spokenAt(marked, 10)).toEqual({ pageId: "one", from: 12, to: 20 })
  })

  test("the last sentence marked so far runs to no word yet", () => {
    expect(spokenAt(marked, 40)).toEqual({ pageId: "one", from: 20, to: null })
  })

  test("two sentences are the same where page and words agree", () => {
    expect(sameSpoken(spokenAt(marked, 10), spokenAt(marked, 11))).toBe(true)
    expect(sameSpoken(spokenAt(marked, 1), spokenAt(marked, 10))).toBe(false)
    expect(sameSpoken(null, null)).toBe(true)
  })

  test("a playhead before any mark speaks nothing", () => {
    expect(spokenAt(placed, 50)).toBeNull()
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
