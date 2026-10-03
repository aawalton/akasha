import { expect, test } from "bun:test"
import {
  cacheNamed,
  changesChecked,
  changesHeld,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import type { Reading } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Held } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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
  value: { beatChanges: "jsonl" },
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

test("a turn's changes are read from the file beside it, and a turn naming none holds none", () => {
  const read: string[] = []
  const textOf = (path: string) => {
    read.push(path)
    return `${JSON.stringify(GAIN)}\n`
  }
  expect(changesHeld(TURN, textOf)).toEqual([GAIN])
  expect(read).toEqual(["stories/saga/turns/saga-00-002.story-turn-played.beat-changes.jsonl"])
  expect(changesHeld({ ...TURN, value: {} }, textOf)).toEqual([])
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
