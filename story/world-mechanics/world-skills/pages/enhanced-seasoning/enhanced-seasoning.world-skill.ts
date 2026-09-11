import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedSeasoning = {
  id: "01a06575-9808-7991-996a-93c90193470b",
  type: "world-skill",
  slug: "enhanced-seasoning",
  title: "Enhanced Seasoning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
