import { expect, test } from "bun:test"
import {
  drawnParagraphsIn,
  proseBlocksOf,
} from "akasha/story/engine/core/modules/prose-paragraphs/prose-paragraphs.module.code.ts"

const WINDOWED = ["You step in.", ":::skill\nname: Swordplay\n:::", "The blade passes clean."].join(
  "\n\n"
)

test("paragraphs are parted by blank lines, and blank runs make no paragraph", () => {
  expect(proseBlocksOf("One.\n\n\n\nTwo.\nstill two.\n\n")).toEqual(["One.", "Two.\nstill two."])
})

test("a window block counts as no paragraph drawn", () => {
  expect(drawnParagraphsIn(WINDOWED)).toBe(2)
})

test("turns counted one by one add up to the chapter they are joined into", () => {
  const turns = ["A.\n\nB.", WINDOWED, "C."]
  const each = turns.reduce((sum, one) => sum + drawnParagraphsIn(one), 0)
  expect(drawnParagraphsIn(turns.join("\n\n"))).toBe(each)
})
