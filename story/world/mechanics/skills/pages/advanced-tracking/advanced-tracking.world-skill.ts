import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedTracking = {
  id: "01a06575-97e9-7b38-b3f1-e4e099d182fd",
  type: "page-type/world-skill",
  slug: "advanced-tracking",
  title: "Advanced Tracking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
