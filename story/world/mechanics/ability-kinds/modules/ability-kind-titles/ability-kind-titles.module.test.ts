import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  abilityKindSlugsIn,
  abilityKindTitlesOf,
  slottedTitlesOf,
} from "akasha/story/world/mechanics/ability-kinds/modules/ability-kind-titles/ability-kind-titles.module.code.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { giftedPath } from "akasha/story/world/pages/gifted/mechanics/ability-kinds/gifted-path.world-ability-kind.ts"
import { giftedSkill } from "akasha/story/world/pages/gifted/mechanics/ability-kinds/gifted-skill.world-ability-kind.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"

const PATH = namedAs(worldAbilityKind.slug, giftedPath.slug, null)

const SKILL = namedAs(worldAbilityKind.slug, giftedSkill.slug, null)

const KINDS = [
  { slug: giftedPath.slug, title: giftedPath.title },
  { slug: giftedSkill.slug, title: giftedSkill.title },
]

test("a skill is named to the title of the ability kind it states", () => {
  const skills = [
    { title: giftedPathOfEndurance.title, abilityKind: PATH },
    { title: giftedPathOfWillpower.title },
  ]
  expect([...abilityKindTitlesOf(skills, KINDS)]).toEqual([[giftedPathOfEndurance.title, "Path"]])
})

test("a title two skills of different kinds share is named to no kind", () => {
  const skills = [
    { title: giftedPathOfEndurance.title, abilityKind: PATH },
    { title: giftedPathOfEndurance.title, abilityKind: SKILL },
  ]
  expect(abilityKindTitlesOf(skills, KINDS).size).toBe(0)
})

test("the kinds the skills state are answered once each, by slug", () => {
  const skills = [{ abilityKind: PATH }, { abilityKind: PATH }, { abilityKind: SKILL }, {}]
  expect(abilityKindSlugsIn(skills)).toEqual([giftedPath.slug, giftedSkill.slug])
})

test("a skill is slotted where the kind it states holds slots", () => {
  const kinds = [
    { slug: giftedPath.slug, activeSlots: giftedPath.activeSlots },
    { slug: giftedSkill.slug },
  ]
  const skills = [
    { title: giftedPathOfEndurance.title, abilityKind: PATH },
    { title: "Fireball", abilityKind: SKILL },
    { title: giftedPathOfWillpower.title },
  ]
  expect([...slottedTitlesOf(skills, kinds)]).toEqual([giftedPathOfEndurance.title])
})
