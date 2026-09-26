import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { LADDER } from "akasha/persona/closeness-level/modules/climbing/closeness-level-climbing.computed-property-module.code.ts"
import { level2 } from "akasha/persona/closeness-level/pages/level-2.closeness-level.ts"
import { level3 } from "akasha/persona/closeness-level/pages/level-3.closeness-level.ts"
import { RUNGS } from "akasha/persona/properties/persona-relationship-level.computed-property.test-fixtures.ts"
import { work } from "akasha/story/world/mechanics/relationships/properties/world-relationship-level.computed-property.code.ts"

const addressOf = (rung: { readonly type: string; readonly slug: string }): string =>
  `${rung.type.slice("page-type/".length)}/${rung.slug}`

const REACH = {
  target: (slug: string) => {
    const rung = RUNGS[Number(slug.slice(LADDER.length))]
    return rung === undefined ? null : { pointsToHere: rung }
  },
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
} as Reach

test("points on the page reach the rung they have reached", () => {
  expect(work({ relationshipPoints: 88 }, REACH)).toBe(addressOf(level3))
})

test("points short of the next rung stay on the rung below it", () => {
  expect(work({ relationshipPoints: 87 }, REACH)).toBe(addressOf(level2))
})

test("points short of the first rung have no level", () => {
  expect(work({ relationshipPoints: 6 }, REACH)).toBeNull()
})

test("a relationship carrying no points has no level", () => {
  expect(work({}, REACH)).toBeNull()
})
