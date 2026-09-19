import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedImpact = {
  id: "01a06575-9808-7bcd-9b6a-832f1c0019a0",
  type: "page-type/world-skill",
  slug: "enhanced-impact",
  title: "Enhanced Impact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
