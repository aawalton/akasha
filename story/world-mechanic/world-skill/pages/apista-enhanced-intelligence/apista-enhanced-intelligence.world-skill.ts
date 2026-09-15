import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const apistaEnhancedIntelligence = {
  id: "01a06575-97eb-784f-ba5a-781b63b96797",
  type: "world-skill",
  slug: "apista-enhanced-intelligence",
  title: "Apista: Enhanced Intelligence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
