import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedAgility = {
  id: "01a06575-9808-7048-ae5e-ee32ac327b07",
  type: "world-skill",
  slug: "enhanced-agility",
  title: "Enhanced Agility",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
