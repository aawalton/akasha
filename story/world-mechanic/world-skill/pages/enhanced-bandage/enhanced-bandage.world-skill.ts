import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const enhancedBandage = {
  id: "01a06575-9808-76fa-bb96-2a788ee038f6",
  type: "world-skill",
  slug: "enhanced-bandage",
  title: "Enhanced Bandage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
