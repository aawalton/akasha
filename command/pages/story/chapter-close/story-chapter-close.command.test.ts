import { expect, test } from "bun:test"
import {
  chapterSlugOf,
  openThrough,
  proseOf,
  taken,
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
    { at: "c", position: 58 },
    { at: "a", position: 56 },
    { at: "d", position: 70 },
    { at: "b", position: 57 },
  ]
  expect(openThrough(turns, 58).map((one) => one.at)).toEqual(["a", "b", "c"])
})
