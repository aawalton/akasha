import { expect, test } from "bun:test"
import { COVER_WIDTH_ASKED } from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import {
  pagedAt,
  pickedFor,
  steppedTo,
  turnCoversOf,
} from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"

function source(image: string): string {
  return `/api/page-file/image/${image}/bytes?w=${COVER_WIDTH_ASKED}`
}

test("the turns paged through are every turn handed with a cover, drawn at twice the panel's width", () => {
  const handed = [
    { id: "a", number: 1, cover: "image/image-a" },
    { id: "c", number: 3, cover: "image/image-c" },
  ]
  expect(turnCoversOf(handed)).toEqual([
    { id: "a", number: 1, source: source("image-a") },
    { id: "c", number: 3, source: source("image-c") },
  ])
})

test("no turn handed draws no picture", () => {
  expect(turnCoversOf([])).toEqual([])
})

test("the paging opens on the latest turn with a cover", () => {
  const covers = [
    { id: "a", number: 1, source: "" },
    { id: "b", number: 2, source: "" },
  ]
  expect(pagedAt(covers, null)).toBe(1)
  expect(pagedAt(covers, "a")).toBe(0)
  expect(pagedAt(covers, "gone")).toBe(1)
})

test("first and last jump to the ends, and a step stops at each end", () => {
  const covers = [
    { id: "a", number: 1, source: "" },
    { id: "b", number: 2, source: "" },
    { id: "c", number: 3, source: "" },
  ]
  expect(steppedTo(covers, 1, "first")?.id).toBe("a")
  expect(steppedTo(covers, 1, "last")?.id).toBe("c")
  expect(steppedTo(covers, 1, "earlier")?.id).toBe("a")
  expect(steppedTo(covers, 1, "later")?.id).toBe("c")
  expect(steppedTo(covers, 0, "first")).toBeUndefined()
  expect(steppedTo(covers, 0, "earlier")).toBeUndefined()
  expect(steppedTo(covers, 2, "last")).toBeUndefined()
  expect(steppedTo(covers, 2, "later")).toBeUndefined()
})

test("a turn paged to holds only until a later turn is drawn", () => {
  expect(pickedFor({ from: "b", to: "a" }, "b")).toBe("a")
  expect(pickedFor({ from: "b", to: "a" }, "c")).toBeNull()
  expect(pickedFor(null, "b")).toBeNull()
})
