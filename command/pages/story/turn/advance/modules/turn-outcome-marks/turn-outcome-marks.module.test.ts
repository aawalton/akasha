import { expect, test } from "bun:test"
import {
  marksOn,
  marksRefused,
  owedIn,
  recorderOf,
} from "akasha/command/pages/story/turn/advance/modules/turn-outcome-marks/turn-outcome-marks.module.code.ts"
import type { Held } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const SKILL = "character-skill/her-swordplay"

const PURSE = "metric-character-currency/her"

const TIME = JSON.stringify({ check: "world-check/time", reading: {}, session: 1, answered: {} })

function drilled(session: number, by: number): string {
  const added = [{ page: SKILL, key: "experience", by }]
  return JSON.stringify({ check: "world-check/drill", reading: {}, session, added, answered: {} })
}

function paid(session: number): string {
  const added = [{ page: PURSE, key: "value", by: -3 }]
  return JSON.stringify({ check: "world-check/board", reading: {}, session, added, answered: {} })
}

const OUTCOMES = [TIME, paid(1), drilled(1, 2)].join("\n")

function gained(outcome: number, from: number, to: number, beat = 1) {
  return { beat, page: SKILL, key: "experience", from, to, note: "drill", outcome }
}

test("each counted line's added is owed, numbered by its line in the outcomes", () => {
  expect(owedIn(OUTCOMES)).toEqual([
    { line: 2, page: PURSE, key: "value", by: -3 },
    { line: 3, page: SKILL, key: "experience", by: 2 },
  ])
})

test("a line a later montage superseded is owed nothing", () => {
  const again = [TIME, paid(1), drilled(1, 2), TIME, paid(1), drilled(1, 1)].join("\n")
  expect(owedIn(again).map((one) => one.line)).toEqual([5, 6])
})

test("purses and story items are the inventory recorder's, and the rest the mechanics recorder's", () => {
  expect(recorderOf(PURSE)).toBe("inventory")
  expect(recorderOf("story-item/her-lamp")).toBe("inventory")
  expect(recorderOf(SKILL)).toBe("mechanics")
})

test("an add met by changes marked with its line passes, for the recorder owning it alone", () => {
  const owed = owedIn(OUTCOMES)
  expect(marksRefused(owed, [gained(3, 35, 37)], "mechanics")).toBeNull()
  expect(marksRefused(owed, [gained(3, 35, 36), gained(3, 36, 37, 2)], "mechanics")).toBeNull()
  expect(marksRefused(owed, [], "inventory")).toContain("outcome line 2 adds -3")
})

test("an add unmarked, or marked short, is refused naming the line, page and key", () => {
  const owed = owedIn(OUTCOMES)
  const unmarked = { ...gained(3, 35, 37), outcome: undefined }
  expect(marksRefused(owed, [unmarked], "mechanics")).toContain(
    'outcome line 3 adds 2 to `experience` of `character-skill/her-swordplay`, and the changes marked `"outcome":3` there add 0'
  )
  expect(marksRefused(owed, [gained(3, 35, 36)], "mechanics")).toContain("add 1")
})

const HELD: Held = {
  game: "the-saga",
  status: "beats",
  lore: [],
  issues: [],
  reviewedBy: [],
  recordedBy: [],
  written: false,
  beats: 4,
}

const TURN = "turns/the-saga-00-002.story-turn-played.ts"

const textOf = (path: string) => (path.endsWith(".outcomes.jsonl") ? OUTCOMES : null)

test("only a mechanics-step recorder's last handing is checked, against what it handed", () => {
  const record = { kind: "record" as const, recorder: "mechanics", changes: [], beat: 2 }
  expect(marksOn(textOf, TURN, HELD, record)).toBeNull()
  expect(marksOn(textOf, TURN, HELD, { ...record, beat: 4 })).toContain("outcome line 3")
  const met = { ...record, beat: 4, changes: [gained(3, 35, 37, 4)] }
  expect(marksOn(textOf, TURN, HELD, met)).toBeNull()
  expect(marksOn(textOf, TURN, HELD, { ...record, recorder: "memory", beat: 4 })).toBeNull()
  expect(marksOn(textOf, TURN, { ...HELD, status: "mechanics" }, record)).toContain("line 3")
})
