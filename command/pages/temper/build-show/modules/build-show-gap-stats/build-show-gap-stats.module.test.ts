import { expect, test } from "bun:test"
import {
  gapLines,
  gapsOf,
  targetStatOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-gap-stats/build-show-gap-stats.module.code.ts"
import {
  CHARACTER_HASH as CHARACTER,
  DESIGN_HASH as DESIGN,
  decoded,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.test-fixtures.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const HEALTH = "health-maximum"

test("a build page's name says the stat it maximizes", () => {
  expect(targetStatOf("max-max-health", "")).toBe(HEALTH)
  expect(targetStatOf("max-max-health-recovery", "")).toBe("health-recovery")
  expect(targetStatOf("new-build", "")).toBeNull()
})

test("a stat the page's description states comes before its name", () => {
  expect(targetStatOf("max-max-health", "built for stamina-maximum")).toBe("stamina-maximum")
})

test("a build set against itself falls short nowhere and differs by nothing", () => {
  const found = gapsOf(decoded(DESIGN), decoded(DESIGN), HEALTH)
  expect(found.gaps).toEqual([])
  expect(found.totals[0]?.difference).toEqual({ front: 0, back: 0 })
})

test("each gap says what closing it alone changes the target stat by, largest first", () => {
  const found = gapsOf(decoded(DESIGN), decoded(CHARACTER), HEALTH)
  const food = found.gaps.find((one) => one.place === "food or drink")
  expect(food?.changes[0]?.stat).toBe(HEALTH)
  expect(food?.changes[0]?.front ?? 0).toBeGreaterThan(0)
  const sizes = found.gaps.map((one) =>
    Math.max(...one.changes.flatMap((change) => [change.front, change.back]))
  )
  expect(sizes).toEqual([...sizes].sort((one, two) => two - one))
})

test("the totals set the design's stat against the character's", () => {
  const [total] = gapsOf(decoded(DESIGN), decoded(CHARACTER), HEALTH).totals
  if (total === undefined) throw new Error("no total for the target stat")
  expect(total.stat).toBe(HEALTH)
  expect(total.difference.front).toBe(
    Math.round((total.design.front - total.character.front) * 100) / 100
  )
})

test("with no target stat a gap shows only the stats it changes", () => {
  const found = gapsOf(decoded(DESIGN), decoded(CHARACTER), null)
  const food = found.gaps.find((one) => one.place === "food or drink")
  expect(food?.changes.length ?? 0).toBeGreaterThan(0)
  expect(food?.changes.every((one) => one.front !== 0 || one.back !== 0)).toBe(true)
})

test("the gaps are shown under the target stat with the totals after", () => {
  const lines = gapLines(gapsOf(decoded(DESIGN), decoded(CHARACTER), HEALTH))
  expect(lines[0]).toBe(`target stat: ${HEALTH}`)
  expect(lines).toContain("totals (Temper)")
})
