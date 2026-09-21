import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import {
  rowsOf,
  type Where,
  whereAt,
} from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import {
  conditionsIn,
  everyFiled,
  exitsIn,
  namedIn,
  placeLike,
  placesFiled,
  thingsIn,
} from "akasha/story/game/modules/world-filing/world-filing.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"
import { entities } from "akasha/story/game/properties/entities.file-property.ts"
import { towerFloors } from "akasha/story/game/properties/tower-floors.file-property.ts"

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
  "external-id": "floor-01",
  floor: 1,
  theme: "A cold stone landing",
  name: "The Threshold",
  exits: ["ascending stair"],
  rooms: [
    {
      id: "threshold-landing",
      name: "The Landing",
      desc: "damp stone",
      light: "none",
      otherExits: "only the iron gate",
      searchables: [{ thing: "rusted iron bar", use: "improvised weapon", status: "TAKEN" }],
    },
  ],
  encounters: [
    {
      id: "ashling-01",
      enemy: { kind: "enemy", name: "Ashling", baseDamage: 9 },
      readableTrait: "a bright core at the chest",
      trigger: "first movement past the iron gate",
      reward: { xp: 60, drop: "a warm cinder" },
    },
  ],
}

function everyOf(row: Record<string, unknown>) {
  const placed = placesFiled(WHERE, row)
  if ("refused" in placed) throw new Error(placed.refused)
  return placed.answered
}

test("the light and the water in a place come off as conditions", () => {
  expect(conditionsIn({ light: "amber", water: "NONE" })).toEqual([
    { name: "light", note: "amber" },
    { name: "water", note: "NONE" },
  ])
  expect(conditionsIn({})).toBe(undefined)
})

test("every way out of a place comes off as one list", () => {
  expect(exitsIn({ exits: ["a stair"], otherExits: "the way behind" })).toEqual([
    "a stair",
    "the way behind",
  ])
  expect(exitsIn({})).toBe(undefined)
})

test("what a place holds to search comes off as its things", () => {
  expect(thingsIn([{ thing: "a bar", use: "a weapon" }])).toEqual([
    { name: "a bar", use: "a weapon", note: undefined, status: undefined },
  ])
})

test("a place, its rooms, what it sets in the way and who that is all become pages", () => {
  expect(everyOf(ROW).map((one) => one.at)).toEqual([
    "story/game/pages/the-tower/locations/the-tower-floor-01.game-location.ts",
    "story/game/pages/the-tower/locations/the-tower-threshold-landing.game-location.ts",
    "story/game/pages/the-tower/encounters/the-tower-ashling-01.game-encounter.ts",
    "story/game/pages/the-tower/entities/the-tower-ashling-01.game-entity.ts",
  ])
})

test("a room is inside the place it was a room of, and is as deep in", () => {
  const room = everyOf(ROW)[1]
  expect(room?.body).toContain('within: "game-location/the-tower-floor-01"')
  expect(room?.body).toContain("depth: 1")
  expect(room?.body).toContain('{name:"light",note:"none"}')
  expect(room?.body).toContain("only the iron gate")
})

test("an encounter names the place it is set in and the one it sets in the way", () => {
  const met = everyOf(ROW)[2]
  expect(met?.body).toContain('title: "Ashling"')
  expect(met?.body).toContain('location: "game-location/the-tower-floor-01"')
  expect(met?.body).toContain('"game-entity/the-tower-ashling-01"')
  expect(met?.body).toContain("experience: 60")
  expect(met?.body).toContain('drop: "a warm cinder"')
})

test("the place itself is inside nothing and carries the theme", () => {
  const place = everyOf(ROW)[0]
  expect(place?.body).toContain('title: "The Threshold"')
  expect(place?.body).toContain("A cold stone landing")
  expect(place?.body).not.toContain("within")
})

test("a row whose kind is a place becomes a place, and any other row an entity", () => {
  const placed = everyFiled(WHERE, [{ externalId: "alan", kind: "player" }, ROW])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered.map((one) => one.at)).toEqual([
    "story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts",
    "story/game/pages/the-tower/locations/the-tower-floor-01.game-location.ts",
    "story/game/pages/the-tower/locations/the-tower-threshold-landing.game-location.ts",
    "story/game/pages/the-tower/encounters/the-tower-ashling-01.game-encounter.ts",
    "story/game/pages/the-tower/entities/the-tower-ashling-01.game-entity.ts",
  ])
})

test("a place written twice is written once, as the later row has it", () => {
  const placed = everyFiled(WHERE, [ROW, { ...ROW, name: "The Second Threshold" }])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered).toHaveLength(4)
  expect(placed.answered[0]?.body).toContain("The Second Threshold")
})

test("a kind the sheet holds rather than the row still says what the row is", () => {
  const placed = everyFiled(WHERE, [{ externalId: "floor-09", sheet: { kind: "floor" } }])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered[0]?.at).toContain("locations/the-tower-floor-09")
})

test("every row the tower's own files hold as a place is read as a place", () => {
  const found = whereAt(ROOT, GAME)
  if ("refused" in found) throw new Error(found.refused)
  for (const property of [entities.propertySlug, towerFloors.propertySlug]) {
    const read = rowsOf(found.answered, property)
    if ("refused" in read) throw new Error(read.refused)
    for (const row of read.answered) {
      const held = row as Record<string, unknown>
      if (!namedIn(held).startsWith("floor-")) continue
      expect(`${property} ${namedIn(held)} ${placeLike(held)}`).toBe(
        `${property} ${namedIn(held)} true`
      )
    }
  }
})
