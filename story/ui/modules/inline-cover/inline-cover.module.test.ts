import { expect, test } from "bun:test"
import {
  anchorKey,
  coversOf,
  FRAME,
  placedAfter,
} from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"

const PARAGRAPHS = [
  "The door *creaked* open.",
  "She stepped into the hall, and the lamps woke one by one.",
  "Outside, rain.",
  "She stepped back.",
]

test("words are matched ignoring case, emphasis marks and punctuation", () => {
  expect(anchorKey("The door *creaked* open.")).toBe("the door creaked open")
  expect(anchorKey("  Outside,   RAIN!  ")).toBe("outside rain")
})

test("a cover is drawn after the paragraph its words open", () => {
  const placed = placedAfter(PARAGRAPHS, [{ id: "a", after: "the door creaked" }])
  expect([...placed.after.entries()]).toEqual([[0, [{ id: "a", after: "the door creaked" }]]])
  expect(placed.rest).toEqual([])
})

test("a cover whose words open no paragraph, or that states none, is left for the end", () => {
  const placed = placedAfter(PARAGRAPHS, [{ id: "a", after: "nowhere at all" }, { id: "b" }])
  expect(placed.after.size).toBe(0)
  expect(placed.rest.map((one) => one.id)).toEqual(["a", "b"])
})

test("covers are matched in order, so words opening two paragraphs take the later one after a cover placed between", () => {
  const placed = placedAfter(PARAGRAPHS, [
    { id: "a", after: "Outside, rain" },
    { id: "b", after: "She stepped" },
  ])
  expect(placed.after.get(2)?.map((one) => one.id)).toEqual(["a"])
  expect(placed.after.get(3)?.map((one) => one.id)).toEqual(["b"])
})

test("words found only before the last cover placed are still placed", () => {
  const placed = placedAfter(PARAGRAPHS, [
    { id: "a", after: "Outside, rain" },
    { id: "b", after: "The door" },
  ])
  expect(placed.after.get(0)?.map((one) => one.id)).toEqual(["b"])
})

test("a cover's box is portrait and sized by the column alone, never by the viewport or the picture", () => {
  expect(FRAME.aspectRatio).toBe("832 / 1216")
  expect(FRAME.width).toBe("100%")
  expect(FRAME.maxWidth).toBe("480px")
})

test("a page's prose is handed only the covers of that page", () => {
  const covers = [
    { id: "a", of: "turn-1" },
    { id: "b", of: "turn-2" },
    { id: "c", of: "turn-1" },
  ]
  expect(coversOf(covers, "turn-1").map((one) => one.id)).toEqual(["a", "c"])
})
