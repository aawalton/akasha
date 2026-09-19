import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const axeOfGigant = {
  id: "01a06575-97f2-768c-baf7-58b417504f4c",
  type: "page-type/world-skill",
  slug: "axe-of-gigant",
  title: "Axe of Gigant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
