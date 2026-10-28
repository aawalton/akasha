import { expect, test } from "bun:test"
import {
  type PageRead,
  type Unbeating,
  unbeaten,
} from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

const PURSE = "metric-character-currency/her"

const SKILL = "character-skill/her-swordplay"

const PAGES: Readonly<Record<string, PageRead>> = {
  [PURSE]: { at: "purses/her.ts", value: { value: 24, history: "jsonl" } },
  [SKILL]: { at: "skills/her-swordplay.ts", value: { experience: 40 } },
}

const HISTORY = [
  JSON.stringify({ turn: 9, value: 9 }),
  JSON.stringify({ turn: 11, value: 24 }),
].join("\n")

const READING: Unbeating = {
  pageOf: (address) => PAGES[address] ?? null,
  beside: (page, key) =>
    key === "history" ? { at: `${page.at}.history.jsonl`, text: HISTORY } : null,
}

const CHANGES = [
  { beat: 2, page: SKILL, key: "experience", from: 35, to: 39, note: "drill" },
  { beat: 3, page: PURSE, key: "value", from: 39, to: 24, note: "board" },
  { beat: 3, page: PURSE, key: "history", append: { turn: 11, value: 24 }, note: "logged" },
  { beat: 4, page: SKILL, key: "experience", from: 39, to: 40, note: "drill" },
  { beat: 6, page: SKILL, key: "experience", from: 40, to: 41, note: "not shown yet" },
]

test("a cancel takes each shown beat's number back to what the turn's first change found", () => {
  const said = unbeaten(CHANGES, 5, 11, READING)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings.map((one) => [one.path, one.values])).toEqual([
    ["skills/her-swordplay.ts", { experience: 35 }],
    ["purses/her.ts", { value: 39 }],
  ])
})

test("a cancel takes the turn's lines out of a history, whatever the line before them says", () => {
  const said = unbeaten(CHANGES, 5, 11, READING)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.rewritten).toEqual([
    { at: "purses/her.ts.history.jsonl", kept: `${JSON.stringify({ turn: 9, value: 9 })}\n` },
  ])
})

test("a beat not shown wrote nothing, so a cancel takes nothing of it back", () => {
  const said = unbeaten(CHANGES.slice(4), 5, 11, READING)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([])
})

test("a page the shown beats made is taken away, and its changes with it", () => {
  const making: BeatChange = { beat: 1, page: SKILL, make: { experience: 0 }, note: "made" }
  const said = unbeaten([making, ...CHANGES.slice(0, 1)], 5, 11, READING)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.removed).toEqual(["skills/her-swordplay.ts"])
  expect(said.namings).toEqual([])
})

test("a shown change to a page no longer here is refused", () => {
  const gone = [
    { beat: 1, page: "metric-character/ghost", key: "value", from: 1, to: 2, note: "x" },
  ]
  expect(unbeaten(gone, 5, 11, READING)).toHaveProperty("refused")
})
