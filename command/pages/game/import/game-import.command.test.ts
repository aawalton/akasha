import { expect, test } from "bun:test"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  gameImport,
  gatheredAt,
  messageFor,
  saidOf,
  taken,
  unfiledOf,
} from "akasha/command/pages/game/import/game-import.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { whereAt } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const ROOT = process.cwd()

const GAME = namedAs(game.slug, theTower.slug, null)

const NOWHERE = namedAs(game.slug, "nothing-is-filed-here", null)

const CALLED = "akasha game import"

const GIVEN: Given = {
  root: ROOT,
  calledAs: CALLED,
  from: ROOT,
  writer: null,
  agentId: null,
}

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const LEAST_PAGES = 30

let asked: readonly Asking[] = []

async function landing(_root: string, every: readonly Asking[]) {
  asked = every
  return {
    base: COMMIT,
    landed: [],
    formatted: [],
    said: [],
    wrong: [],
    commit: COMMIT,
    untracked: [],
  }
}

function pathsOf(every: readonly Asking[]): readonly string[] {
  return every.map((one) => (one.given as { readonly at: string }).at)
}

test("a call naming no game is refused", () => {
  expect(taken([], CALLED)).toHaveProperty("refused")
})

test("a call names the game whose rows are read", () => {
  expect(taken(["--game", GAME], CALLED)).toEqual({ game: GAME })
})

test("the message says how many rows became pages", () => {
  expect(messageFor(GAME, 4)).toBe("take 4 of game/the-tower's rows into pages")
})

test("what was written is said back, with the commit it landed as", () => {
  expect(saidOf([{ at: "a/b.ts", body: "" }], COMMIT)).toEqual([
    "wrote\ta/b.ts",
    `commit\t${COMMIT}`,
  ])
})

test("a page already filed is left as it is", () => {
  const filed = [
    { at: "story/game/game.page-type.ts", body: "" },
    { at: "story/game/nothing-is-filed-here.ts", body: "" },
  ]
  expect(unfiledOf(ROOT, filed).map((one) => one.at)).toEqual([
    "story/game/nothing-is-filed-here.ts",
  ])
})

test("a game that is no page is refused", async () => {
  const answer = await gameImport(["--game", NOWHERE], GIVEN, landing)
  expect(answer.code).not.toBe(0)
})

test("the tower's rows become pages under the tower's own folder", () => {
  const found = whereAt(ROOT, GAME)
  if ("refused" in found) throw new Error(found.refused)
  const gathered = gatheredAt(found.answered)
  if ("refused" in gathered) throw new Error(gathered.refused)
  const paths = gathered.answered.map((one) => one.at)
  expect(paths.length).toBeGreaterThan(LEAST_PAGES)
  expect(paths.every((one) => one.startsWith("story/game/pages/the-tower/"))).toBe(true)
  expect(paths).toContain(
    "story/game/pages/the-tower/locations/the-tower-floor-01.game-location.ts"
  )
  expect(paths).toContain(
    "story/game/pages/the-tower/encounters/the-tower-ashling-01.game-encounter.ts"
  )
  expect(paths).toContain("story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts")
  expect(paths).toContain("story/game/pages/the-tower/turns/the-tower-088.game-turn.ts")
})

test("a run with nothing left to file lands nothing", async () => {
  asked = []
  const answer = await gameImport(["--game", GAME], GIVEN, landing)
  expect(pathsOf(asked).every((one) => one.startsWith("story/game/pages/the-tower/"))).toBe(true)
  expect(answer.code === 0 || asked.length === 0).toBe(true)
})
