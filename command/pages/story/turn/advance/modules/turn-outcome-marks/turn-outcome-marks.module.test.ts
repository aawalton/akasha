import { expect, test } from "bun:test"
import {
  marksOn,
  marksRefused,
  owedIn,
  recorderOf,
  unmarkedIn,
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

const skillOwed = () => owedIn(OUTCOMES).filter((one) => one.page === SKILL)

test("an add met by changes marked with its line passes, in one change or several", () => {
  expect(marksRefused(skillOwed(), [gained(3, 35, 37)])).toBeNull()
  expect(marksRefused(skillOwed(), [gained(3, 35, 36), gained(3, 36, 37, 2)])).toBeNull()
  expect(marksRefused(owedIn(OUTCOMES), [gained(3, 35, 37)])).toContain("outcome line 2 adds -3")
})

test("an add unmarked, or marked short, is refused naming the line, page and key", () => {
  const unmarked = { ...gained(3, 35, 37), outcome: undefined }
  expect(marksRefused(skillOwed(), [unmarked])).toContain(
    'outcome line 3 adds 2 to `experience` of `character-skill/her-swordplay`, and the changes marked `"outcome":3` there add 0'
  )
  expect(marksRefused(skillOwed(), [gained(3, 35, 36)])).toContain("add 1")
})

test("a change setting a key an outcome adds to is refused at once unless marked with that line", () => {
  const unmarked = { ...gained(3, 35, 37), outcome: undefined }
  expect(unmarkedIn(skillOwed(), [unmarked])).toContain(
    "the change on beat 1 sets `experience` of `character-skill/her-swordplay`, which outcome line 3 adds to"
  )
  expect(unmarkedIn(skillOwed(), [gained(9, 35, 37)])).toContain("names none of them")
  expect(unmarkedIn(skillOwed(), [gained(3, 35, 37)])).toBeNull()
  const other = { beat: 1, page: SKILL, key: "rank", from: 1, to: 2, note: "rank" }
  expect(unmarkedIn(skillOwed(), [other])).toBeNull()
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

const SPENT = { beat: 4, page: PURSE, key: "value", from: 39, to: 36, note: "board", outcome: 2 }

test("at beats each handing is checked for marks, and the last for every add, by the numbers seat", () => {
  const record = { kind: "record" as const, recorder: "mechanics", changes: [], beat: 2 }
  expect(marksOn(textOf, TURN, HELD, record)).toBeNull()
  const unmarked = { ...gained(3, 35, 37, 2), outcome: undefined }
  expect(marksOn(textOf, TURN, HELD, { ...record, changes: [unmarked] })).toContain("beat 2 sets")
  expect(marksOn(textOf, TURN, HELD, { ...record, beat: 4 })).toContain("outcome line 3")
  const met = { ...record, beat: 4, changes: [gained(3, 35, 37, 4), SPENT] }
  expect(marksOn(textOf, TURN, HELD, met)).toBeNull()
  expect(marksOn(textOf, TURN, HELD, { ...record, recorder: "memory", beat: 4 })).toBeNull()
})

test("a turn with no outcomes file owes no add, and its handings pass", () => {
  const unread = (path: string): string => {
    throw Object.assign(new Error(`ENOENT: no such file, open '${path}'`), { code: "ENOENT" })
  }
  const record = {
    kind: "record" as const,
    recorder: "mechanics",
    changes: [gained(3, 35, 37, 4)],
    beat: 4,
  }
  expect(marksOn(unread, TURN, HELD, record)).toBeNull()
  expect(marksOn(() => null, TURN, HELD, record)).toBeNull()
  const broken = (): string => {
    throw Object.assign(new Error("EACCES"), { code: "EACCES" })
  }
  expect(() => marksOn(broken, TURN, HELD, record)).toThrow("EACCES")
})

test("at mechanics each recorder answers for its own adds alone", () => {
  const at = { ...HELD, status: "mechanics" as const }
  const record = { kind: "record" as const, recorder: "mechanics", changes: [gained(3, 35, 37)] }
  expect(marksOn(textOf, TURN, at, record)).toBeNull()
  const carried = { kind: "record" as const, recorder: "inventory", changes: [] }
  expect(marksOn(textOf, TURN, at, carried)).toContain("outcome line 2")
})
