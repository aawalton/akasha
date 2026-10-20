import { expect, test } from "bun:test"
import { generateFoodsAndDrinksCommand } from "akasha/change/agent/page/generate-foods-and-drinks/generate-foods-and-drinks.change-agent.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { temperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.ts"
import { healthRecovery } from "akasha/temper/player/character/stat/temper-metric/pages/health-recovery/health-recovery.temper-metric.ts"

const MINE_AT = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.part2.jsonl"

const PAGES = "temper/player/character/source/temper-food-or-drink/pages/"

const MEAD_AT = `${PAGES}markarth-mead.${temperFoodOrDrink.slug}.ts`

const CASE_AT =
  "temper/player/character/stat/temper-stat-case/pages/mead/mead.temper-stat-case.verified-stats.json"

const RECOVERY = `${healthRecovery.type.slice("page-type/".length)}/${healthRecovery.slug}`

const MEAD_SAYS = "Increase Health Recovery by |cffffff660|r for |cffffff1.1|r hours."

function rowOf(itemId: number, title: string, itemType: number, said: string): string {
  return JSON.stringify({ title, itemId, itemType, abilityDescription: said, icon: "/art.dds" })
}

const MINE = [
  rowOf(68257, "Markarth Mead", 12, MEAD_SAYS),
  rowOf(68300, "Reach Mead", 12, MEAD_SAYS),
  rowOf(70000, "Barley Bread", 4, "Increase Max Health by |cffffff385|r for |cffffff1.1|r hours."),
  rowOf(70001, "barley bread recipe", 29, "Increase Max Health by 385 for 1.1 hours."),
  rowOf(70002, "Old Bread", 4, ""),
].join("\n")

function meadOf(value: number): string {
  return [
    "export const markarthMead = {",
    `  type: "page-type/${temperFoodOrDrink.slug}",`,
    '  slug: "markarth-mead",',
    '  title: "Markarth Mead",',
    '  foodOrDrinkKind: "drink",',
    "  itemId: 68257,",
    "  abilityId: 61322,",
    "  seconds: 2100,",
    `  effects: [{ metric: "${RECOVERY}", effectType: "integer", value: ${String(value)} }],`,
    "  hashPlace: 18,",
    "} as const",
    "",
  ].join("\n")
}

const PINNED = JSON.stringify({
  activeBuffs: [{ abilityId: 61322, name: "Increase Health Recovery" }],
  pinned: { [healthRecovery.slug]: 900 },
})

function worldHolding(texts: Record<string, string>): World {
  const under = (folder: string): readonly string[] =>
    Object.keys(texts).filter((path) => path.startsWith(folder))
  return { ...worldOf(texts), under }
}

function writtenAt(said: ReturnType<typeof generateFoodsAndDrinksCommand>, path: string): string {
  const one = said.edits.find((edit) => edit.kind !== "move" && edit.path === path)
  if (one?.kind === "add") return one.content
  return one?.kind === "replace" ? one.contentTo : ""
}

test("each distinct buff becomes a page at the next hash place, and recipes are left out", () => {
  const said = generateFoodsAndDrinksCommand(
    worldHolding({ [MINE_AT]: MINE, [MEAD_AT]: meadOf(660) })
  )
  const breadAt = `${PAGES}barley-bread.${temperFoodOrDrink.slug}.ts`
  expect(said.refused).toBeNull()
  expect(
    said.edits.filter((one) => one.kind === "add").map((one) => one.kind === "add" && one.path)
  ).toEqual([breadAt])
  expect(writtenAt(said, breadAt)).toContain("hashPlace: 19,")
  expect(writtenAt(said, breadAt)).toContain("itemIds: [70000],")
  expect(writtenAt(said, MEAD_AT)).toContain("itemIds: [68257,68300],")
  expect(writtenAt(said, MEAD_AT)).toContain("seconds: 3960,")
})

test("a hand-made effect a pinned case verifies is kept where the mine reads otherwise", () => {
  const said = generateFoodsAndDrinksCommand(
    worldHolding({ [MINE_AT]: MINE, [MEAD_AT]: meadOf(900), [CASE_AT]: PINNED })
  )
  expect(writtenAt(said, MEAD_AT)).toContain('"value":900')
  expect(said.told?.[3]).toBe("1 hand-made pages keep their effects: markarth-mead")
})

test("a hand-made effect no case verifies takes what the mine reads", () => {
  const said = generateFoodsAndDrinksCommand(
    worldHolding({ [MINE_AT]: MINE, [MEAD_AT]: meadOf(900) })
  )
  expect(writtenAt(said, MEAD_AT)).toContain('"value":660')
  expect(said.told?.[3]).toBe("0 hand-made pages keep their effects")
})

test("a mine holding no food or drink is refused", () => {
  expect(generateFoodsAndDrinksCommand(worldHolding({ [MEAD_AT]: meadOf(660) })).refused).toMatch(
    /^no food or drink is in the item mine/
  )
})
