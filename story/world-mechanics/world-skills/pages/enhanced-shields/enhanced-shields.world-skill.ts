import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedShields = {
  id: "01a06575-9808-77b4-bf40-1c81bcf7b6c2",
  type: "world-skill",
  slug: "enhanced-shields",
  title: "Enhanced Shields",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
