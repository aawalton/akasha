import { expect, test } from "bun:test"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  coversOn,
  overlayOf,
} from "akasha/story/ui/modules/beat-reading/beat-reading.module.code.tsx"
import { NO_OVERLAY } from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"

const XP = "metric-character/elsie-xp"

const LAMP = "story-item/elsie-lamp"

const BEATS: Beats = {
  beats: ["Elsie trains.", "Elsie takes a lamp."],
  scenes: [],
  changes: [
    { beat: 1, page: XP, key: "value", from: 100, to: 140, note: "+40 XP" },
    { beat: 2, page: XP, key: "value", from: 140, to: 160, note: "+20 XP" },
    { beat: 2, page: LAMP, make: { title: "Lamp" }, note: "takes a lamp" },
  ],
  memory: [],
}

test("a value read at a beat is the value the pages hold as of that beat", () => {
  expect(overlayOf(BEATS, 0).valueOf(XP, "value", 160)).toBe(100)
  expect(overlayOf(BEATS, 1).valueOf(XP, "value", 160)).toBe(140)
  expect(overlayOf(BEATS, 2).valueOf(XP, "value", 160)).toBe(160)
})

test("a value the later chapters moved on is still the beat's own value", () => {
  expect(overlayOf(BEATS, 1).valueOf(XP, "value", 9999)).toBe(140)
  expect(overlayOf(BEATS, 2).valueOf(XP, "value", 9999)).toBe(160)
})

test("a page made in a later beat is drawn nowhere before that beat", () => {
  expect(overlayOf(BEATS, 1).shows(LAMP)).toBe(false)
  expect(overlayOf(BEATS, 2).shows(LAMP)).toBe(true)
  expect(overlayOf(BEATS, 1).valueOf(LAMP, "title", undefined)).toBeUndefined()
  expect(overlayOf(BEATS, 2).valueOf(LAMP, "title", undefined)).toBe("Lamp")
})

test("a key the beats do not change is the value the page holds", () => {
  expect(overlayOf(BEATS, 0).valueOf(XP, "maxValue", 200)).toBe(200)
  expect(overlayOf(BEATS, 1).keysOf(XP)).toEqual(["value"])
  expect(overlayOf(BEATS, 1).keysOf(LAMP)).toEqual(["title"])
})

test("covers sit on the beat each shows", () => {
  const pictured = {
    ...BEATS,
    pictured: [{ beat: 2, cover: "image/image-a", coverAfter: "Elsie takes" }],
  }
  expect(coversOn(pictured, 1)).toEqual([])
  expect(coversOn(pictured, 2)).toEqual([
    { id: "2/1", number: 2, cover: "image/image-a", after: "Elsie takes" },
  ])
})

test("beats changing nothing hand the pages over as they are", () => {
  const plain: Beats = { beats: ["One."], scenes: [], changes: [], memory: [] }
  expect(overlayOf(plain, 0)).toBe(NO_OVERLAY)
})
