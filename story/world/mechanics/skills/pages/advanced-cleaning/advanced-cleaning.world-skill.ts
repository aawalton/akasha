import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedCleaning = {
  id: "01a06575-97e9-7a3e-972b-222a83d00bce",
  type: "page-type/world-skill",
  slug: "advanced-cleaning",
  title: "Advanced Cleaning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
