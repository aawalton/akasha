import { expect, test } from "bun:test"
import {
  beatCoversOf,
  beatsVersionOf,
} from "akasha/story/world/stories/written/chapters/modules/chapter-beat-reading/chapter-beat-reading.module.code.ts"

const BEATS = {
  beats: ["Morning.", "Noon.", "Night."],
  scenes: [],
  changes: [],
  memory: [],
  pictured: [
    { beat: 1, cover: "image/image-a", coverAfter: "She woke" },
    { beat: 3, cover: "image/image-c", coverAfter: "She slept" },
  ],
}

test("each picture on a beat is handed to the panels with the beat it shows", () => {
  expect(beatCoversOf("ch", BEATS)).toEqual([
    { id: "ch#1", number: 1, cover: "image/image-a", beat: 1 },
    { id: "ch#2", number: 3, cover: "image/image-c", beat: 3 },
  ])
})

test("beats with no pictures hand the panels none", () => {
  expect(beatCoversOf("ch", { ...BEATS, pictured: [] })).toEqual([])
  const bare = { beats: BEATS.beats, scenes: [], changes: [], memory: [] }
  expect(beatCoversOf("ch", bare)).toEqual([])
})

test("a chapter's beats version changes with any scene or its cover, and only then", () => {
  const held = beatsVersionOf("image/image-a", ["image/image-b", "image/image-c"])
  expect(beatsVersionOf("image/image-a", ["image/image-b", "image/image-c"])).toBe(held)
  expect(beatsVersionOf("image/image-a", ["image/image-b", "image/image-d"])).not.toBe(held)
  expect(beatsVersionOf("image/image-a", ["image/image-c", "image/image-b"])).not.toBe(held)
  expect(beatsVersionOf("image/image-z", ["image/image-b", "image/image-c"])).not.toBe(held)
  expect(beatsVersionOf("image/image-a", ["image/image-b"])).not.toBe(held)
})
