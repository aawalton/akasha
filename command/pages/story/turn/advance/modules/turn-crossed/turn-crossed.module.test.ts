import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import {
  crossedSaid,
  crossingsIn,
} from "akasha/command/pages/story/turn/advance/modules/turn-crossed/turn-crossed.module.code.ts"
import {
  advancedBy,
  LANDED,
  ROOT,
  reachOver,
  seatOf,
  seen,
  toldAll,
  turnAt,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function lineOf(check: string, reading: unknown, answered: unknown): string {
  return JSON.stringify({ check: `world-check/${check}`, reading, answered })
}

test("a rank the answer states other than its reading did is a crossing", () => {
  const reading = { character: "character-player/mara", level: 1, rank: 2 }
  const answered = { level: 1, rank: 3, ranked: true, experience: 90 }
  expect(crossingsIn(lineOf("overwhere-iii-growth", reading, answered))).toEqual([
    "- `overwhere-iii-growth` for `mara`: rank from 2 to 3",
  ])
})

test("each entry naming its kind that moves is a crossing, named by what moved", () => {
  const answered = {
    grown: [
      { kind: "skill", skill: "Spearmanship", from: 1, to: 2 },
      { kind: "skill", skill: "Dimension Magic", from: 2, to: 2 },
      { kind: "experience", track: "class", from: 1, to: 2 },
      { kind: "depth", from: "Surface", to: "Shallows" },
    ],
  }
  expect(crossingsIn(lineOf("overwhere-iv-growth", { character: "nala" }, answered))).toEqual([
    "- `overwhere-iv-growth` for `nala`: skill Spearmanship from 1 to 2",
    "- `overwhere-iv-growth` for `nala`: experience class from 1 to 2",
    "- `overwhere-iv-growth` for `nala`: depth from Surface to Shallows",
  ])
})

test("a number climbing in an entry naming no kind, or a check holding still, crosses nothing", () => {
  const noticed = { noticed: [{ god: "sardanal", from: 0, to: 2, reached: [] }] }
  const outcomes = [
    lineOf("otherwhere-xi-notice", { character: "otherwhere-xi-nala" }, noticed),
    lineOf("overwhere-iii-growth", { level: 1, rank: 3 }, { level: 1, rank: 3 }),
    "",
  ].join("\n")
  expect(crossingsIn(outcomes)).toEqual([])
})

test("a line a later line of its check and character replaces crosses nothing", () => {
  const reading = { character: "character-player/mara", rank: 2 }
  const outcomes = [
    lineOf("overwhere-iii-growth", reading, { rank: 3 }),
    lineOf("overwhere-iii-growth", reading, { rank: 2 }),
  ].join("\n")
  expect(crossingsIn(outcomes)).toEqual([])
})

test("the game master is told nothing where the turn before crossed nothing", () => {
  expect(crossedSaid(null)).toBe("")
  expect(crossedSaid({ turn: "the-saga-00-002", crossings: [] })).toBe("")
})

test("a turn the world builder hands on tells the game master alone what the turn before crossed", async () => {
  const into = seen()
  const builder = seatOf("world-builder", "mari-world-builder-the-saga")
  const reach = reachOver(turnAt("world-builder"), builder, into)
  const crossed = {
    turn: "the-saga-00-002",
    crossings: ["- `the-saga-growth` for `mara`: rank from 2 to 3"],
  }
  const answer = await advancedBy(
    [],
    reach,
    async () => LANDED,
    () => undefined,
    () => null,
    () => [],
    undefined,
    () => crossed
  )
  expect(answer.refusals).toEqual([])
  const [master, ...rest] = toldAll("game-master")
  expect(into.notices).toEqual([`${master}${crossedSaid(crossed)}`, ...rest])
})

test("the crossings are said after the notice, naming the turn they were settled on", () => {
  const said = crossedSaid({ turn: "the-saga-00-002", crossings: ["- `growth`: rank from 2 to 3"] })
  expect(said).toBe(
    "\n\nThe checks settled on `the-saga-00-002` crossed these; open a window for each its prose did not show:\n- `growth`: rank from 2 to 3"
  )
})
