import { expect, test } from "bun:test"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  drawingOf,
  type Looking,
  madeByEdit,
  redrawOf,
  subjectIn,
} from "akasha/story/world/stories/played/modules/cover-redrawing/cover-redrawing.module.code.ts"

const MADE = {
  model: "beyond-reality-3",
  prompt: "a lighthouse at dusk",
  steps: 8,
  guidance: 1,
  width: 1216,
  height: 832,
}

const DRAWN = { ...MADE, width: 832, height: 1216 }

const INPUT = "image/image-input"

const EDITED = {
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: INPUT,
  prompt: "Keep this exact woman. She kneads dough.",
}

function looking(held: Readonly<Record<string, Value>>, cover: string | null = null): Looking {
  return { image: (address) => held[address] ?? null, subjectCover: () => cover }
}

test("a render is made again from what its image page records, at the one portrait size", () => {
  expect(drawingOf(MADE)).toEqual(DRAWN)
  expect(drawingOf({ ...MADE, prompt: " " })).toEqual({
    refused: "This picture has no prompt saved, so it can't be redrawn.",
  })
  expect(drawingOf(null)).toHaveProperty("refused")
})

test("a picture another model rendered is rendered by the story model at that model's own steps", () => {
  expect(drawingOf({ model: "Tongyi-MAI/Z-Image-Turbo", prompt: MADE.prompt, steps: 30 })).toEqual(
    DRAWN
  )
  expect(drawingOf({ prompt: MADE.prompt })).toEqual(DRAWN)
})

test("a rendered picture is rendered again rather than edited", () => {
  expect(redrawOf(MADE, looking({}))).toEqual(DRAWN)
  expect(madeByEdit(MADE)).toBe(false)
})

test("an edited picture is edited again from its recorded input with its recorded prompt", () => {
  expect(madeByEdit(EDITED)).toBe(true)
  expect(redrawOf(EDITED, looking({ [INPUT]: MADE }))).toEqual({
    prompt: EDITED.prompt,
    input: INPUT,
  })
})

test("an edit made from several images is edited again from all of them, in order", () => {
  const place = "image/image-place"
  const elsie = "image/image-elsie"
  const cora = "image/image-cora"
  const beat = { ...EDITED, inputImage: place, referenceImages: [elsie, cora] }
  const held = { [place]: MADE, [elsie]: MADE, [cora]: MADE }
  expect(redrawOf(beat, looking(held))).toEqual({
    prompt: EDITED.prompt,
    input: place,
    references: [elsie, cora],
  })
  expect(redrawOf(beat, looking({ [place]: MADE, [elsie]: MADE }))).toEqual({
    refused: "The picture this was made from is gone, so it can't be redrawn.",
  })
})

test("an edit whose input is gone takes its subject's cover, and with none is refused", () => {
  const cover = "image/image-her-cover"
  expect(redrawOf(EDITED, looking({ [cover]: MADE }, cover))).toEqual({
    prompt: EDITED.prompt,
    input: cover,
  })
  expect(redrawOf(EDITED, looking({}, cover))).toEqual({
    refused: "The picture this was made from is gone, so it can't be redrawn.",
  })
  expect(redrawOf({ ...EDITED, inputImage: "" }, looking({}))).toHaveProperty("refused")
})

test("the subject of a picture is the character the beat picturing it names", () => {
  const beats = [
    '{"beat":1,"pictured":[{"cover":"image/image-a","setting":"the bakery"}]}',
    '{"beat":2,"pictured":[{"cover":"image/image-b","character":"character-other/elsie"}]}',
  ].join("\n")
  expect(subjectIn(beats, "image/image-b")).toBe("character-other/elsie")
  expect(subjectIn(beats, "image/image-a")).toBeNull()
  expect(subjectIn(beats, "image/image-c")).toBeNull()
})
