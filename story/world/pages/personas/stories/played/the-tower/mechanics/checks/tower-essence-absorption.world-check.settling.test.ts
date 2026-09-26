import { expect, test } from "bun:test"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { theTowerAffinity } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-affinity.tower-attunement-rank.ts"
import { theTowerSoul } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-soul.tower-attunement-rank.ts"
import { theTowerSpirit } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-spirit.tower-attunement-rank.ts"
import {
  type Absorbed,
  settled,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-essence-absorption.world-check.settling.code.ts"
import { theTowerEmber } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/pages/the-tower-ember.tower-element.ts"
import { theTowerSound } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/pages/the-tower-sound.tower-element.ts"
import { towerIntellect } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-intellect/tower-intellect.page-type.ts"
import { towerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-will/tower-will.page-type.ts"

const AT = {
  element: theTowerEmber.slug,
  held: { [towerIntellect.slug]: 18, [towerWill.slug]: 16 },
  intent: 3,
  rank: null,
  trained: false,
}

const FOUR: Rolled = { total: 4, crit: false, fumble: false }

function absorbedFrom(reading: unknown, roll: Rolled = FOUR): Absorbed {
  const said = settled(reading, roll)
  if ("refused" in said) throw new Error(said.refused)
  return said.answered
}

test("the first absorption on the first floor comes off rough, as the tower recorded it", () => {
  const ran = absorbedFrom(AT)
  expect(ran.score).toBeCloseTo(44.6)
  expect(ran.margin).toBeCloseTo(-5.4)
  expect(ran).toMatchObject({
    band: "rough",
    training: 0,
    mana: 30,
    pool: "health",
    backlash: 12,
    opens: true,
  })
})

test("holding the element already makes the next absorption cleaner", () => {
  const reading = { ...AT, rank: theTowerAffinity.slug, trained: true, intent: 5 }
  const ran = absorbedFrom(reading, { total: 9, crit: false, fumble: false })
  expect(ran.margin).toBeCloseTo(7.6)
  expect(ran).toMatchObject({ band: "adequate", training: 6, mana: 18, backlash: 5, opens: false })
})

test("a relevant skill or any attunement at all trains the absorber by three", () => {
  expect(absorbedFrom({ ...AT, trained: true }).training).toBe(3)
})

test("each rank above the first trains the absorber one more", () => {
  expect(absorbedFrom({ ...AT, rank: theTowerSpirit.slug }).training).toBe(8)
})

test("a clean absorption costs less mana and carries no backlash", () => {
  const ran = absorbedFrom({ ...AT, rank: theTowerSoul.slug, intent: 10 })
  expect(ran).toMatchObject({ band: "clean", mana: 9, backlash: 0, lingers: null })
})

test("a rough absorption of sound rings the ears", () => {
  const ran = absorbedFrom({ ...AT, element: theTowerSound.slug })
  expect(ran).toMatchObject({ pool: "mana", backlash: 25 })
  expect(ran.lingers).toContain("ringing ears")
})

test("an absorption takes whatever the dice say", () => {
  expect(absorbedFrom(AT, { total: 1, crit: false, fumble: true }).band).toBe("rough")
})

test("an element the Tower has no page for is refused", () => {
  expect(settled({ ...AT, element: "the-tower-cold" }, FOUR)).toHaveProperty("refused")
})

test("a rank the Tower has no page for is refused", () => {
  expect(settled({ ...AT, rank: "the-tower-ascended" }, FOUR)).toHaveProperty("refused")
})

test("a sheet missing an attribute the mental attack reads is refused", () => {
  expect(settled({ ...AT, held: { [towerWill.slug]: 16 } }, FOUR)).toHaveProperty("refused")
})
