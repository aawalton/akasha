import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedBandage = {
  id: "01a06575-9808-76fa-bb96-2a788ee038f6",
  type: "world-skill",
  slug: "enhanced-bandage",
  title: "Enhanced Bandage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
