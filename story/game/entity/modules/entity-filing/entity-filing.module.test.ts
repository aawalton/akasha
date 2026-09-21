import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  classIn,
  diceAt,
  entityFiled,
  sheetIn,
  slugFor,
  someOf,
} from "akasha/story/game/entity/modules/entity-filing/entity-filing.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import { twoDTen } from "akasha/story/game/mechanic/pages/two-d-ten/two-d-ten.game-mechanic.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const ROOT = process.cwd()

const GAME = namedAs(game.slug, theTower.slug, null)

const WHERE: Where = {
  root: ROOT,
  game: GAME,
  slug: theTower.slug,
  path: `story/game/pages/${theTower.slug}/${theTower.slug}.${game.slug}.ts`,
  folder: `story/game/pages/${theTower.slug}`,
}

const ROW = {
  externalId: "ashling",
  kind: "enemy",
  sheet: {
    name: "Ashling",
    class: "Ember-thing",
    level: 2,
    rollMode: "2d10",
    baseDamage: 9,
    intentTypical: 2,
    attributes: { MIGHT: 12, VITALITY: 8 },
    equipment: { armor: { def: 4 }, weapon: { atk: 6 } },
    hpNote: "computed by engine: 112 HP",
  },
}

function bodyFor(named: string, row: Record<string, unknown>): string {
  const composed = entityFiled(WHERE, named, row)
  if ("refused" in composed) throw new Error(composed.refused)
  return composed.answered.body
}

test("a row holding its own under a key reads the same as a row holding it flat", () => {
  expect(sheetIn({ a: 1, sheet: { b: 2 } })).toEqual({ a: 1, sheet: { b: 2 }, b: 2 })
  expect(sheetIn({ a: 1 })).toEqual({ a: 1 })
})

test("a place keeping its own under its own key is read through that key too", () => {
  const held = sheetIn({ "external-id": "floor-01", "floor-data": { name: "The Threshold" } })
  expect(held["name"]).toBe("The Threshold")
})

test("a class the old engine wrote as none is no class", () => {
  expect(classIn("None")).toBe(undefined)
  expect(classIn("Ember-thing")).toBe("Ember-thing")
})

test("the dice a sheet says are read as the mechanic rolling them", () => {
  expect(diceAt("2d10")).toBe(namedAs(gameMechanic.slug, twoDTen.slug, null))
  expect(diceAt("3d7")).toBe(undefined)
})

test("a slug opens with the game's own", () => {
  expect(slugFor(theTower.slug, "ashling")).toBe("the-tower-ashling")
})

test("an empty list is nothing", () => {
  expect(someOf([])).toBe(undefined)
  expect(someOf([1])).toEqual([1])
})

test("a row becomes a page under the game's own folder", () => {
  const composed = entityFiled(WHERE, "ashling", ROW)
  if ("refused" in composed) throw new Error(composed.refused)
  expect(composed.answered.at).toBe(
    "story/game/pages/the-tower/entities/the-tower-ashling.game-entity.ts"
  )
})

test("a page says what the sheet said", () => {
  const body = bodyFor("ashling", ROW)
  expect(body).toContain('title: "Ashling"')
  expect(body).toContain(`game: "${GAME}"`)
  expect(body).toContain('kind: "enemy"')
  expect(body).toContain('class: "Ember-thing"')
  expect(body).toContain("level: 2")
  expect(body).toContain("baseDamage: 9")
  expect(body).toContain("typicalIntent: 2")
  expect(body).toContain('{attribute:"game-attribute/might",score:12}')
  expect(body).toContain('{attribute:"game-attribute/vitality",score:8}')
  expect(body).toContain('slot:"weapon",attack:6')
  expect(body).toContain("defense:4")
})

test("a note the sheet kept apart is folded into the one note", () => {
  const body = bodyFor("ashling", ROW)
  expect(body).toContain("computed by engine: 112 HP")
  expect(body).not.toContain("hpNote")
})

test("a list the sheet has nothing in is left off, and no field is written empty", () => {
  const body = bodyFor("ashling", ROW)
  expect(body).not.toContain("skills")
  expect(body).not.toContain("undefined")
})
