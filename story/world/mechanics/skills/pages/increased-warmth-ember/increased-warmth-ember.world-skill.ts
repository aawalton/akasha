import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedWarmthEmber = {
  id: "01a06575-981e-74ee-a37b-64c498a4a9de",
  type: "page-type/world-skill",
  slug: "increased-warmth-ember",
  title: "Increased Warmth: Ember",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
