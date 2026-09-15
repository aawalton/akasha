import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const enhancedPotions = {
  id: "01a06575-9808-721e-a7c4-b054f63bbb15",
  type: "world-skill",
  slug: "enhanced-potions",
  title: "Enhanced Potions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
