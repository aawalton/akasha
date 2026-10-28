import { expect, test } from "bun:test"
import {
  type Correction,
  correctedOn,
  type Placed,
  respliced,
} from "akasha/command/pages/story/turn/correct/modules/beat-correcting/beat-correcting.module.code.ts"
import type { PageRead } from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import type {
  BeatChange,
  Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const PURSE = "metric-character-currency/her"

const PURSE_AT = "purses/her.metric-character-currency.ts"

const SKILL = "character-skill/her-swordplay"

const SKILL_AT = "skills/her-swordplay.character-skill.ts"

const HISTORY_AT = "purses/her.metric-character-currency.history.jsonl"

const KEPT = JSON.stringify({ turn: 1, value: 9 })

const PAID = JSON.stringify({ turn: 2, value: 5 })

const LATER = JSON.stringify({ turn: 2, value: 3 })

type World = { readonly values: Readonly<Record<string, Readonly<Record<string, unknown>>>> }

const PATHS: Readonly<Record<string, string>> = { [PURSE]: PURSE_AT, [SKILL]: SKILL_AT }

function readingOf(world: World): Reading {
  return {
    exists: (page) => page in world.values,
    valueOf: (page, key) => world.values[page]?.[key],
    filed: (page, key) =>
      page === PURSE && key === "history"
        ? { propertySlug: "history", ending: "jsonl", stated: true, at: HISTORY_AT }
        : null,
  }
}

function beatingOf(world: World) {
  return {
    pageOf: (address: string): PageRead | null => {
      const at = PATHS[address]
      const value = world.values[address]
      return at === undefined || value === undefined ? null : { at, value }
    },
    beside: (page: PageRead, key: string) =>
      page.at === PURSE_AT && key === "history"
        ? { at: HISTORY_AT, text: `${KEPT}\n${PAID}\n${LATER}\n` }
        : null,
  }
}

function beatsOf(changes: readonly BeatChange[]): Beats {
  return { beats: ["She pays.", "She drills.", "She pays again."], scenes: [], changes, memory: [] }
}

const TURN: readonly BeatChange[] = [
  { beat: 1, page: PURSE, key: "value", from: 9, to: 5, note: "paid" },
  { beat: 1, page: PURSE, key: "history", append: { turn: 2, value: 5 }, note: "logged" },
  { beat: 2, page: SKILL, key: "experience", from: 35, to: 40, note: "drill" },
  { beat: 3, page: PURSE, key: "value", from: 5, to: 3, note: "paid again" },
  { beat: 3, page: PURSE, key: "history", append: { turn: 2, value: 3 }, note: "logged" },
]

const WORLD: World = { values: { [PURSE]: { value: 3 }, [SKILL]: { experience: 40 } } }

function correctionOf(beat: number, changes: readonly BeatChange[]): Correction {
  const story: Placed[] = [{ slug: "saga-00-002", beats: beatsOf(TURN), shown: 3 }]
  return { story, at: 0, beat, changes }
}

test("a corrected beat takes back its old numbers and writes its new ones onto the page", () => {
  const changes = [{ beat: 2, page: SKILL, key: "experience", from: 35, to: 38, note: "drill" }]
  const said = correctedOn(correctionOf(2, changes), readingOf(WORLD), beatingOf(WORLD))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([
    {
      pageTypeSlug: "character-skill",
      slug: "her-swordplay",
      path: SKILL_AT,
      values: { experience: 38 },
      merge: true,
    },
  ])
})

test("a correction whose change starts from another value than the beats left is refused", () => {
  const changes = [{ beat: 2, page: SKILL, key: "experience", from: 40, to: 42, note: "drill" }]
  const said = correctedOn(correctionOf(2, changes), readingOf(WORLD), beatingOf(WORLD))
  expect(said).toEqual({ refused: expect.stringContaining("was 40, and it is 35") })
})

test("a corrected beat a later beat sets again leaves the page and names the later beat", () => {
  const changes = [
    { beat: 1, page: PURSE, key: "value", from: 9, to: 6, note: "paid" },
    { beat: 1, page: PURSE, key: "history", append: { turn: 2, value: 6 }, note: "logged" },
  ]
  const said = correctedOn(correctionOf(1, changes), readingOf(WORLD), beatingOf(WORLD))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([])
  expect(said.report.join("\n")).toContain("beat 3 of saga-00-002 starts from 5")
  const line = JSON.stringify({ turn: 2, value: 6 })
  expect(said.files).toEqual([{ at: HISTORY_AT, content: `${KEPT}\n${line}\n${LATER}\n` }])
})

test("a beat corrected to change nothing takes back all it changed", () => {
  const said = correctedOn(correctionOf(2, []), readingOf(WORLD), beatingOf(WORLD))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings.map((one) => one.values)).toEqual([{ experience: 35 }])
})

test("a change naming another beat is refused", () => {
  const changes = [{ beat: 3, page: SKILL, key: "experience", from: 40, to: 41, note: "drill" }]
  const said = correctedOn(correctionOf(2, changes), readingOf(WORLD), beatingOf(WORLD))
  expect(said).toHaveProperty("refused")
})

test("a list takes its new lines at the place its old lines held", () => {
  expect(respliced(["a", "b", "c"], (one) => one, ["b"], ["x", "y"])).toEqual(["a", "x", "y", "c"])
  expect(respliced(["a"], (one) => one, [], ["x"])).toEqual(["a", "x"])
})
