import { expect, test } from "bun:test"
import {
  beatsBodyOf,
  cacheNamed,
  changesChecked,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import { beatsHeld } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import type { Reading } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import type {
  Held,
  Moved,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const XP = "metric-character/elsie-xp"

const PURSE = "metric-character-currency/elsie-silver"

const GAIN = { beat: 1, page: XP, key: "value", from: 120, to: 160, note: "Elsie gains 40 XP" }

const READING: Reading = {
  exists: (page) => page === XP,
  valueOf: (page, key) => (page === XP && key === "value" ? 120 : undefined),
}

const TURN = {
  at: "stories/saga/turns/saga-00-002.story-turn-played.ts",
  slug: "saga-00-002",
  value: { beats: "jsonl" },
}

const PLANNED = { beats: ["Elsie trains.", "Elsie rests."], scenes: [], changes: [], memory: [] }

const LEARNS = { beat: 2, page: "lore/elsie", fact: "Elsie is tired", learns: "character/elsie" }

function movedOf(more: Partial<Moved>): Moved {
  return {
    status: "mechanics",
    values: {},
    prose: null,
    planned: null,
    changes: null,
    memory: null,
    starts: [],
    stopsCaller: false,
    landsKept: false,
    ...more,
  }
}

function heldAt(status: Held["status"], more: Partial<Held> = {}): Held {
  return {
    game: "saga",
    status,
    lore: [],
    issues: [],
    reviewedBy: [],
    recordedBy: [],
    written: false,
    ...more,
  }
}

test("a turn's beats are read from the one file beside it, and a turn naming none holds none", () => {
  const read: string[] = []
  const held = { ...PLANNED, changes: [GAIN] }
  const textOf = (path: string) => {
    read.push(path)
    return beatsWritten(held)
  }
  expect(beatsHeld(TURN, textOf)).toEqual(held)
  expect(read).toEqual(["stories/saga/turns/saga-00-002.story-turn-played.beats.jsonl"])
  expect(beatsHeld({ ...TURN, value: {} }, textOf)).toEqual({ ...PLANNED, beats: [] })
  expect("refused" in beatsHeld(TURN, () => "not json\n")).toBe(true)
})

test("each step replaces only its own part of the beats, and the game master starts them again", () => {
  const held = { ...PLANNED, changes: [GAIN] }
  const remembered = beatsBodyOf(held, movedOf({ memory: [LEARNS] }))
  expect(remembered).toBe(beatsWritten({ ...held, memory: [LEARNS] }))
  const planned = { beats: ["Elsie sleeps."], scenes: [] }
  expect(beatsBodyOf(held, movedOf({ planned }))).toBe(beatsWritten({ ...PLANNED, ...planned }))
  expect(beatsBodyOf(held, movedOf({}))).toBeNull()
})

test("a mechanics seat's changes are checked with the changes the turn holds already", () => {
  const held = heldAt("mechanics", { changes: [GAIN] })
  const again = { ...GAIN, beat: 2, note: "Elsie gains 40 XP again" }
  const handed = { kind: "record", recorder: "inventory", changes: [again] } as const
  expect(changesChecked(READING, held, handed)).toContain("was 120, and it is 160")
  const fixed = { ...handed, changes: [{ ...again, from: 160, to: 200 }] }
  expect(changesChecked(READING, held, fixed)).toBeNull()
  expect(changesChecked(READING, heldAt("recorders"), handed)).toBeNull()
})

test("the move to player names each page the changes leave, making a page filed new", () => {
  const made = { beat: 1, page: PURSE, make: { value: 5 }, note: "Elsie opens a purse" }
  const held = heldAt("recorders", { changes: [GAIN, made] })
  expect(cacheNamed(READING, held, "player")).toEqual([
    { pageTypeSlug: "metric-character", slug: "elsie-xp", merge: true, values: { value: 160 } },
    {
      pageTypeSlug: "metric-character-currency",
      slug: "elsie-silver",
      merge: false,
      values: { value: 5 },
    },
  ])
  expect(cacheNamed(READING, held, "recorders")).toEqual([])
})
