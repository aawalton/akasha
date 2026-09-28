import { expect, test } from "bun:test"
import { COVER_WIDTH_ASKED } from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import {
  keyStep,
  pagedAt,
  pickedFor,
  steppedTo,
  turnCoversOf,
} from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"

function source(image: string): string {
  return `${whole(image)}?w=${COVER_WIDTH_ASKED}`
}

function whole(image: string): string {
  return `/api/page-file/image/${image}/bytes`
}

function covers(count: number) {
  return Array.from({ length: count }, (_, at) => ({
    id: String.fromCharCode(97 + at),
    number: at + 1,
    source: "",
    whole: "",
  }))
}

test("the turns paged through are every turn handed with a cover, drawn at twice the panel's width", () => {
  const handed = [
    { id: "a", number: 1, cover: "image/image-a" },
    { id: "c", number: 3, cover: "image/image-c" },
  ]
  expect(turnCoversOf(handed)).toEqual([
    { id: "a", number: 1, source: source("image-a"), whole: whole("image-a") },
    { id: "c", number: 3, source: source("image-c"), whole: whole("image-c") },
  ])
})

test("the arrow keys step, and Home and End jump, while the full-size view is open", () => {
  expect(keyStep("ArrowLeft")).toBe("earlier")
  expect(keyStep("ArrowRight")).toBe("later")
  expect(keyStep("Home")).toBe("first")
  expect(keyStep("End")).toBe("last")
  expect(keyStep("Escape")).toBeNull()
})

test("no turn handed draws no picture", () => {
  expect(turnCoversOf([])).toEqual([])
})

test("the paging opens on the latest turn with a cover", () => {
  const two = covers(2)
  expect(pagedAt(two, null)).toBe(1)
  expect(pagedAt(two, "a")).toBe(0)
  expect(pagedAt(two, "gone")).toBe(1)
})

test("first and last jump to the ends, and a step stops at each end", () => {
  const three = covers(3)
  expect(steppedTo(three, 1, "first")?.id).toBe("a")
  expect(steppedTo(three, 1, "last")?.id).toBe("c")
  expect(steppedTo(three, 1, "earlier")?.id).toBe("a")
  expect(steppedTo(three, 1, "later")?.id).toBe("c")
  expect(steppedTo(three, 0, "first")).toBeUndefined()
  expect(steppedTo(three, 0, "earlier")).toBeUndefined()
  expect(steppedTo(three, 2, "last")).toBeUndefined()
  expect(steppedTo(three, 2, "later")).toBeUndefined()
})

test("a turn paged to holds only until a later turn is drawn", () => {
  expect(pickedFor({ from: "b", to: "a" }, "b")).toBe("a")
  expect(pickedFor({ from: "b", to: "a" }, "c")).toBeNull()
  expect(pickedFor(null, "b")).toBeNull()
})
