import { expect, test } from "bun:test"
import {
  closed,
  closingsOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.code.ts"
import {
  CHARACTER_HASH as CHARACTER,
  DESIGN_HASH as DESIGN,
  decoded,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.test-fixtures.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()

function placesOf(design: string, character: string): readonly string[] {
  return closingsOf(decoded(design), decoded(character), null, null).map((one) => one.place)
}

test("a build set against itself falls short nowhere", () => {
  expect(placesOf(DESIGN, DESIGN)).toEqual([])
})

test("a gap is something the design has that the character lacks", () => {
  const places = placesOf(DESIGN, CHARACTER)
  expect(places).toContain("food or drink")
  expect(places).toContain("passive undaunted-mettle")
  expect(places).toContain("head set")
  expect(places).toContain("head quality")
  expect(places).toContain("front bar active-1")
})

test("what only the character has, or has more of, is no gap", () => {
  const places = placesOf(DESIGN, CHARACTER)
  expect(places).not.toContain("passive juggernaut")
  expect(places).not.toContain("front main-hand trait")
  expect(places).not.toContain("necklace enchant")
  expect(places.some((one) => one.startsWith("skill line"))).toBe(false)
  expect(places.some((one) => one.includes("craft"))).toBe(false)
})

test("closing a gap gives the character what the design has there and nothing else", () => {
  const design = decoded(DESIGN)
  const character = decoded(CHARACTER)
  const food = closingsOf(design, character, null, null).find(
    (one) => one.place === "food or drink"
  )
  if (food === undefined) throw new Error("the fixture lacks no food")
  const after = closed(character, food)
  expect(after.consumables.foodOrDrink).toBe(design.consumables.foodOrDrink)
  expect(after.equipment).toEqual(character.equipment)
  expect(character.consumables.foodOrDrink).toBe("no-food-or-drink")
})

test("star points fall short only where both builds carry a reading's stars", () => {
  const build = decoded(DESIGN)
  const want = [{ championSkillId: 2, points: 50, maxPoints: 50 }]
  const have = [{ championSkillId: 2, points: 10, maxPoints: 50 }]
  expect(closingsOf(build, build, want, null)).toEqual([])
  const [points] = closingsOf(build, build, want, have)
  expect(points?.want).toBe("50")
  expect(points?.have).toBe("10")
})
