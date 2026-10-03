import { expect, test } from "bun:test"
import {
  type Pictured,
  picturedIn,
} from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"

const ELSIE: Pictured = {
  beat: 2,
  cover: "image/image-a",
  coverAfter: "She pulled her nightshirt off",
  character: "character-player/elsie",
  outfit: "naked",
}

const ATTIC: Pictured = {
  beat: 1,
  cover: "image/image-b",
  coverAfter: "Elsie lay still",
  setting: "the attic",
}

test("a picture is one json line naming its beat, its image page and its anchor quote", () => {
  const lines = [ELSIE, ATTIC].map((one) => JSON.stringify(one))
  expect(picturedIn(lines, 2)).toEqual([ATTIC, ELSIE])
})

test("a picture past the last beat, with no image page, no quote or a stray key is refused", () => {
  expect(picturedIn([JSON.stringify(ELSIE)], 1)).toEqual({
    refused: "picture 1 names no beat from 1 to 1",
  })
  expect(picturedIn([JSON.stringify({ ...ATTIC, cover: "a" })], 1)).toEqual({
    refused: "picture 1 names no image page by its address",
  })
  expect(picturedIn([JSON.stringify({ ...ATTIC, coverAfter: " " })], 1)).toEqual({
    refused: "picture 1 quotes no `coverAfter` from the prose",
  })
  expect("refused" in picturedIn([JSON.stringify({ ...ATTIC, mood: 1 })], 1)).toBe(true)
})
