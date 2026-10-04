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

test("a beat's own picture names its place and up to two characters", () => {
  const heron: Pictured = {
    beat: 2,
    cover: "image/image-c",
    coverAfter: "Supper, Tamsin said",
    place: "place/the-heron",
    characters: ["character-other/tam", "character-other/tilda"],
  }
  expect(picturedIn([JSON.stringify(heron)], 2)).toEqual([heron])
  const alone: Pictured = { ...ATTIC, place: "place/the-bakery" }
  expect(picturedIn([JSON.stringify(alone)], 1)).toEqual([alone])
  const crowd = { ...heron, characters: [...(heron.characters ?? []), "character-player/elsie"] }
  expect(picturedIn([JSON.stringify(crowd)], 2)).toEqual({
    refused: "picture 1 names 3 characters, and a picture holds at most 2",
  })
  expect(picturedIn([JSON.stringify({ ...heron, characters: "tamsin" })], 2)).toEqual({
    refused: "picture 1 states `characters` as no list of character pages",
  })
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
