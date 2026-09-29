import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-working.world-check.settling.code.ts"
import { overwhereIiiNalaManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/pages/overwhere-iii-nala-mana-weaver.overwhere-iii-trait-held.ts"
import { overwhereIiiManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/pages/overwhere-iii-mana-weaver.overwhere-iii-trait.ts"

const LENT = (overwhereIiiManaWeaver.draw ?? 0) * overwhereIiiNalaManaWeaver.rank

const SURGE_ONE = { total: 1, crit: false, fumble: true }

const SURGE_THREE = { total: 3, crit: false, fumble: false }

test("Mana Weaver lends its draw times her rank", () => {
  expect(settled({ own: 2 }, SURGE_THREE)).toHaveProperty("answered.lent", LENT)
})

test("the working carries her own mana, the lending and the die", () => {
  expect(settled({ own: 2 }, SURGE_THREE)).toHaveProperty("answered.total", 2 + LENT + 3)
})

test("a mana node multiplies the lending by the node factor", () => {
  expect(settled({ own: 2, nearNode: true }, SURGE_THREE)).toHaveProperty(
    "answered.lent",
    LENT * (overwhereIiiManaWeaver.nodeFactor ?? 1)
  )
})

test("pulling past the lending costs strain", () => {
  expect(settled({ own: 2, pull: 4 }, SURGE_THREE)).toHaveProperty(
    "answered.strain",
    4 * (overwhereIiiManaWeaver.strain ?? 0)
  )
})

test("an unstrained working costs no health", () => {
  expect(settled({ own: 2 }, SURGE_THREE)).toHaveProperty("answered.strain", 0)
})

test("a working of thirty or more lands crushing force", () => {
  expect(settled({ own: 30 }, SURGE_ONE)).toHaveProperty("answered.force", "crushing")
})

test("negative mana is refused", () => {
  expect(settled({ own: -1 }, SURGE_THREE)).toHaveProperty("refused")
})
