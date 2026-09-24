import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.ts"
import { lineOf } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import {
  type Asking,
  gameAt,
  gameSlugIn,
  lastRunAt,
  runsIn,
  runsUnder,
  settledBy,
} from "akasha/story/game/game-mechanic/modules/mechanic-settling/mechanic-settling.module.code.ts"
import { attributeCheck } from "akasha/story/game/game-mechanic/pages/attribute-check/attribute-check.game-mechanic.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const ROOT = process.cwd()

const GAME = namedAs(storyGame.slug, theTower.slug, null)

const NOWHERE = namedAs(storyGame.slug, "nothing-is-filed-here", null)

const CHECK = namedAs(gameMechanic.slug, attributeCheck.slug, null)

const NO_MECHANIC = namedAs(gameMechanic.slug, "nothing-is-filed-here", null)

const BESIDE = `${theTower.slug}.${storyGame.slug}.ts`

const ASKING: Asking = {
  root: ROOT,
  game: GAME,
  turn: 3,
  mechanic: CHECK,
  reading: { attribute: 11, difficulty: 24, intent: 4 },
  dice: "1d20",
  bonuses: [],
  said: null,
  before: null,
}

test("a game is found by the address or the slug that names it", () => {
  expect(gameSlugIn(GAME)).toBe(theTower.slug)
  expect(gameSlugIn(theTower.slug)).toBe(theTower.slug)
  expect(gameAt(ROOT, GAME)?.endsWith(BESIDE)).toBe(true)
  expect(gameAt(ROOT, NOWHERE)).toBe(null)
})

test("a game's runs sit in a folder beside that game's page", () => {
  const at = gameAt(ROOT, GAME)
  if (at === null) throw new Error("the tower is a page here")
  expect(runsUnder(at).endsWith(`${theTower.slug}/mechanic-runs`)).toBe(true)
})

test("the runs a game has are its own, in the order they were made", () => {
  const runs = runsIn(ROOT, GAME)
  expect(runs.length).toBeGreaterThan(0)
  expect(runs.every((one) => one.startsWith(`${theTower.slug}-run-`))).toBe(true)
  expect(runs).toEqual([...runs].sort())
  expect(runsIn(ROOT, NOWHERE)).toEqual([])
})

test("a game that is no page has no run before", () => {
  expect(lastRunAt(ROOT, NOWHERE)).toBe(null)
})

test("the run before is read off the file beside that run's page", () => {
  const before = lastRunAt(ROOT, GAME)
  if (before === null) throw new Error("the tower has runs")
  expect(JSON.parse(before)).toHaveProperty("mechanic")
})

test("the numbers a turn settles come from the mechanic the game names", async () => {
  const settled = await settledBy(ASKING)
  if ("refused" in settled) throw new Error(settled.refused)
  const run = settled.answered
  expect(run.mechanic).toBe(CHECK)
  expect(run.turn).toBe(3)
  expect(run.dice?.said).toBe("1d20")
  expect(run.dice?.faces).toHaveLength(1)
  expect(run.answered).toHaveProperty("margin")
  expect(run.answered).toHaveProperty("damage")
})

test("where no row comes before, the game's own name seeds the roll", async () => {
  const settled = await settledBy(ASKING)
  if ("refused" in settled) throw new Error(settled.refused)
  expect(settled.answered.seed).toBe(GAME)
  expect(settled.answered.follows).toBe(null)
})

test("the same asking settles the same numbers", async () => {
  expect(await settledBy(ASKING)).toEqual(await settledBy(ASKING))
})

test("a row follows the row before it, and is rolled from that row's hash", async () => {
  const first = await settledBy(ASKING)
  if ("refused" in first) throw new Error(first.refused)
  const next = await settledBy({ ...ASKING, before: lineOf(first.answered) })
  if ("refused" in next) throw new Error(next.refused)
  expect(next.answered.follows).toBe(next.answered.seed)
  expect(next.answered.seed).not.toBe(first.answered.seed)
  expect(next.answered.dice?.faces).not.toEqual(first.answered.dice?.faces)
})

test("a run naming no dice rolls none and seeds nothing", async () => {
  const settled = await settledBy({
    ...ASKING,
    dice: null,
    reading: { ...ASKING.reading, roll: { total: 12, crit: false, fumble: false } },
  })
  if ("refused" in settled) throw new Error(settled.refused)
  expect(settled.answered.dice).toBe(null)
  expect(settled.answered.seed).toBe(null)
})

test("a mechanic the index does not hold is refused", async () => {
  expect(await settledBy({ ...ASKING, mechanic: NO_MECHANIC })).toHaveProperty("refused")
})

test("what is no handful of dice is refused", async () => {
  expect(await settledBy({ ...ASKING, dice: "a fistful" })).toHaveProperty("refused")
})
