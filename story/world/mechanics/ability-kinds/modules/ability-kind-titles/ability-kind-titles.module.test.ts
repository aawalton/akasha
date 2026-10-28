import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  abilityKindSlugsIn,
  abilityKindTitlesOf,
  crossedHeadingOf,
  heldAbilityOf,
  slottedTitlesOf,
  unlockedHeadingOf,
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

const TIERED_KINDS = [
  { slug: giftedPath.slug, title: giftedPath.title, activeSlots: giftedPath.activeSlots },
  { slug: giftedSkill.slug, title: giftedSkill.title },
]

const TIERED_SKILLS = [
  { title: giftedPathOfEndurance.title, abilityKind: PATH, tierSteps: [10, 25, 50] },
  { title: "Fireball", abilityKind: SKILL, tierSteps: [5, 10] },
]

test("a new slotted ability is headed Unlocked, and another by its kind alone", () => {
  const path = heldAbilityOf(giftedPathOfEndurance.title, TIERED_SKILLS, TIERED_KINDS)
  const skill = heldAbilityOf("Fireball", TIERED_SKILLS, TIERED_KINDS)
  expect(path === null ? null : unlockedHeadingOf(path)).toBe("Path Unlocked")
  expect(skill === null ? null : unlockedHeadingOf(skill)).toBe("Skill")
  expect(heldAbilityOf("Nothing", TIERED_SKILLS, TIERED_KINDS)).toBeNull()
})

test("a tier crossed is headed Advanced, and the final tier Completed", () => {
  const path = heldAbilityOf(giftedPathOfEndurance.title, TIERED_SKILLS, TIERED_KINDS)
  const skill = heldAbilityOf("Fireball", TIERED_SKILLS, TIERED_KINDS)
  expect(path === null ? null : crossedHeadingOf(path, 2)).toBe("Path Advanced")
  expect(path === null ? null : crossedHeadingOf(path, 3)).toBe("Path Completed")
  expect(skill === null ? null : crossedHeadingOf(skill, 1)).toBe("Skill Advanced")
  expect(crossedHeadingOf({ kind: "Path", slotted: true, tierSteps: [] }, 4)).toBe("Path Advanced")
})
