import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flagLesserMissileDefense = {
  id: "01a06575-980d-7296-a6b6-1d703d85795c",
  type: "page-type/world-skill",
  slug: "flag-lesser-missile-defense",
  title: "Flag: Lesser Missile Defense",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
