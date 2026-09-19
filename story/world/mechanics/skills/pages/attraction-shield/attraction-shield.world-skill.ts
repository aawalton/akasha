import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const attractionShield = {
  id: "01a06575-97ee-71eb-b3fe-64c6e9960190",
  type: "page-type/world-skill",
  slug: "attraction-shield",
  title: "Attraction Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
