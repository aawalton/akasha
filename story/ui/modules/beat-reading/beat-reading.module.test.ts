import { expect, test } from "bun:test"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  aheadOf,
  baseOf,
  coversOn,
  overlayOf,
  presentAt,
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

const ADP = "metric-character-stat/wren-adp"

test("who is there follows each beat's arrivals and leavings", () => {
  const cast: Beats = {
    beats: ["a", "b", "c"],
    scenes: [
      { beat: 1, present: ["character-player/wren", "character-other/theron"] },
      { beat: 2, arrive: ["character-other/brecca"] },
      { beat: 3, leave: ["character-other/theron"] },
    ],
    changes: [],
    memory: [],
  }
  expect(presentAt(cast, 0)).toEqual([])
  expect(presentAt(cast, 1)).toEqual(["character-player/wren", "character-other/theron"])
  expect(presentAt(cast, 2)).toEqual([
    "character-player/wren",
    "character-other/theron",
    "character-other/brecca",
  ])
  expect(presentAt(cast, 3)).toEqual(["character-player/wren", "character-other/brecca"])
})

test("a key the chapter leaves alone is the value the chapters before it left", () => {
  const before: Beats = {
    beats: ["a"],
    scenes: [],
    changes: [{ beat: 1, page: ADP, key: "value", from: 11, to: 12, note: "up" }],
    memory: [],
  }
  const overlay = overlayOf(BEATS, 0, baseOf([before]))
  expect(overlay.knows(ADP)).toBe(true)
  expect(overlay.keysOf(ADP)).toEqual(["value"])
  expect(overlay.valueOf(ADP, "value", 17)).toBe(12)
  expect(overlay.valueOf(XP, "value", 9999)).toBe(100)
})

const CLASS = "character-class/elsie-enthraller"

const BOND = "world-relationship/elsie-cora"

test("a page a later chapter makes or reveals is drawn nowhere in this one", () => {
  const later: Beats = {
    beats: ["a", "b"],
    scenes: [],
    changes: [
      { beat: 1, page: CLASS, key: "unrevealed", from: true, to: false, note: "Class" },
      { beat: 2, page: BOND, make: { relationshipPoints: 5 }, note: "Bond: Cora 5" },
      { beat: 2, page: BOND, key: "relationshipPoints", from: 5, to: 10, note: "Bond: 10" },
    ],
    memory: [],
  }
  const overlay = overlayOf(BEATS, 2, baseOf([]), aheadOf([later]))
  expect(overlay.shows(BOND)).toBe(false)
  expect(overlay.knows(CLASS)).toBe(true)
  expect(overlay.keysOf(CLASS)).toEqual(["unrevealed"])
  expect(overlay.valueOf(CLASS, "unrevealed", false)).toBe(true)
  expect(overlay.valueOf(XP, "value", 9999)).toBe(160)
})

test("the chapters before win over the chapters after", () => {
  const before: Beats = {
    beats: ["a"],
    scenes: [],
    changes: [{ beat: 1, page: ADP, key: "value", from: 11, to: 12, note: "up" }],
    memory: [],
  }
  const after: Beats = {
    beats: ["a"],
    scenes: [],
    changes: [{ beat: 1, page: ADP, key: "value", from: 12, to: 13, note: "up" }],
    memory: [],
  }
  const overlay = overlayOf(BEATS, 0, baseOf([before]), aheadOf([after]))
  expect(overlay.valueOf(ADP, "value", 13)).toBe(12)
  expect(overlay.shows(ADP)).toBe(true)
})

test("beats changing nothing hand the pages over as they are", () => {
  const plain: Beats = { beats: ["One."], scenes: [], changes: [], memory: [] }
  expect(overlayOf(plain, 0)).toBe(NO_OVERLAY)
})
