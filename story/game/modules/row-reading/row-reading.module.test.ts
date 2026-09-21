import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import {
  fileAt,
  rowsIn,
  rowsOf,
  type Where,
  whereAt,
} from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const ROOT = process.cwd()

const GAME = namedAs(game.slug, theTower.slug, null)

const NOWHERE = namedAs(game.slug, "nothing-is-filed-here", null)

const FLOORS = "tower-floors"

const TOWER_FLOORS = 5

function whereOf(said: string): Where {
  const found = whereAt(ROOT, said)
  if ("refused" in found) throw new Error(found.refused)
  return found.answered
}

test("a game is found by its address, and nothing else is", () => {
  const where = whereOf(GAME)
  expect(where.slug).toBe(theTower.slug)
  expect(where.path.endsWith(`${theTower.slug}.${game.slug}.ts`)).toBe(true)
  expect(whereAt(ROOT, NOWHERE)).toHaveProperty("refused")
  expect(whereAt(ROOT, theTower.slug)).toHaveProperty("refused")
})

test("a file sits beside the game's page, named for the property", () => {
  const beside = fileAt(whereOf(GAME), FLOORS)
  expect(beside?.endsWith(`${theTower.slug}.${game.slug}.${FLOORS}.jsonl`)).toBe(true)
})

test("a blank line is no row", () => {
  expect(rowsIn('{"a":1}\n\n  \n{"b":2}\n', "somewhere")).toEqual({
    answered: [{ a: 1 }, { b: 2 }],
  })
})

test("a line that is no json refuses the file and says which line", () => {
  const read = rowsIn('{"a":1}\nnot json\n', "somewhere")
  if (!("refused" in read)) throw new Error("this was not refused")
  expect(read.refused).toContain("line 2 of somewhere")
})

test("the tower's floors read as one row each", () => {
  const read = rowsOf(whereOf(GAME), FLOORS)
  if ("refused" in read) throw new Error(read.refused)
  expect(read.answered).toHaveLength(TOWER_FLOORS)
})

test("a file the game has nowhere reads as no rows", () => {
  expect(rowsOf(whereOf(GAME), "nothing-is-held-here")).toEqual({ answered: [] })
})
