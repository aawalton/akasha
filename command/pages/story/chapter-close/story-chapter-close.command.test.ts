import { expect, test } from "bun:test"
import {
  chapterSlugOf,
  lastTurnOf,
  openThrough,
  proseOf,
  taken,
  turnCoversOf,
} from "akasha/command/pages/story/chapter-close/story-chapter-close.command.code.ts"

const CALLED = "akasha story chapter-close"

test("a call names the story, the last turn and the title", () => {
  const read = taken(["--story", "the-tower", "--through", "69", "--title", "The Dark"], CALLED)
  expect(read).toEqual({ story: "the-tower", through: 69, title: "The Dark" })
})

test("a call naming no title is refused", () => {
  const read = taken(["--story", "the-tower", "--through", "69", "--title", " "], CALLED)
  expect("refused" in read).toBe(true)
})

test("a chapter's slug says its place in its story and its title", () => {
  expect(chapterSlugOf("the-tower", 4, "The Ascending Dark")).toBe(
    "the-tower-0004-the-ascending-dark"
  )
})

test("a chapter's prose heads the turns with its title and keeps each window block", () => {
  const block = ":::level-up\nlevel: 5\n:::"
  expect(proseOf("The Dark", ["One.\n", `${block}\n\nTwo.\n`])).toBe(
    `# The Dark\n\nOne.\n\n${block}\n\nTwo.\n`
  )
})

test("a chapter takes the open turns through the one named, in order", () => {
  const turns = [
    { at: "c", slug: "t-00-058", position: 58 },
    { at: "a", slug: "t-00-056", position: 56 },
    { at: "d", slug: "t-00-070", position: 70 },
    { at: "b", slug: "t-00-057", position: 57 },
  ]
  expect(openThrough(turns, 58).map((one) => one.at)).toEqual(["a", "b", "c"])
})

test("a chapter says the slug and position of the last turn it takes", () => {
  const turns = [
    { at: "b", slug: "otherwhere-00-049", position: 49 },
    { at: "a", slug: "otherwhere-00-048", position: 48 },
  ]
  expect(lastTurnOf(turns)).toEqual({ lastTurn: "otherwhere-00-049", lastTurnPosition: 49 })
  expect(lastTurnOf([])).toBeNull()
})

test("a chapter keeps the cover of each turn it takes that has one, under the turn's number", () => {
  const turns = [
    { at: "a", slug: "t-00-001", position: 1, cover: "image/image-one" },
    { at: "b", slug: "t-00-002", position: 2 },
    { at: "c", slug: "t-00-003", position: 3, cover: "image/image-three" },
  ]
  expect(turnCoversOf(turns)).toEqual([
    { position: 1, cover: "image/image-one" },
    { position: 3, cover: "image/image-three" },
  ])
})
