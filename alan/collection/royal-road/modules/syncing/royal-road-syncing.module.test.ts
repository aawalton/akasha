import { expect, test } from "bun:test"
import {
  chapterPageSlug,
  slugify,
} from "akasha/alan/collection/royal-road/modules/syncing/royal-road-syncing.module.code.ts"

test("a title is turned into lower words joined by hyphens", () => {
  expect(slugify("Chapter 1391 - Two Swords, One Bow")).toBe("chapter-1391-two-swords-one-bow")
})

test("a chapter's name opens with its story and its position padded to four digits", () => {
  expect(chapterPageSlug("the-primal-hunter", 7, "Big Pig", "557051", 0)).toBe(
    "the-primal-hunter-0007-big-pig"
  )
})

test("a title yielding no word is named by the fallback handed in", () => {
  expect(chapterPageSlug("the-primal-hunter", 7, "???", "557051", 0)).toBe(
    "the-primal-hunter-0007-557051"
  )
})

test("a name never runs past a slug's hundred characters with the room kept", () => {
  const long = "a very long title ".repeat(10)
  expect(chapterPageSlug("s".repeat(60), 1, long, "1", 8).length).toBeLessThanOrEqual(92)
})
