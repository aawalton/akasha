import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import {
  codeAt,
  ranAt,
} from "akasha/story/game/mechanic/modules/mechanic-running/mechanic-running.module.code.ts"
import { linearStat } from "akasha/story/game/mechanic/pages/linear-stat/linear-stat.game-mechanic.ts"

const ROOT = process.cwd()

const AT = namedAs(gameMechanic.slug, linearStat.slug, null)

const NOWHERE = namedAs(gameMechanic.slug, "nothing-is-filed-here", null)

const BESIDE = `${linearStat.slug}.${gameMechanic.slug}.code.ts`

test("an address reaches the code beside the mechanic's page", () => {
  expect(codeAt(ROOT, AT)?.endsWith(BESIDE)).toBe(true)
})

test("an address the index does not hold reaches no code", () => {
  expect(codeAt(ROOT, NOWHERE)).toBe(null)
})

test("a name that qualifies no page type reaches no code", () => {
  expect(codeAt(ROOT, linearStat.slug)).toBe(null)
})

test("the mechanic an address names is run", async () => {
  const ran = await ranAt(ROOT, AT, {
    terms: [{ of: "might", by: 2 }],
    constant: 1,
    rounding: "none",
    held: { might: 4 },
  })
  expect(ran).toEqual({ answered: 9 })
})

test("an address naming no mechanic is refused", async () => {
  const ran = await ranAt(ROOT, NOWHERE, {})
  expect(ran).toHaveProperty("refused")
})
