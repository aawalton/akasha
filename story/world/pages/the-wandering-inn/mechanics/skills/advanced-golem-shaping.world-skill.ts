import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedGolemShaping = {
  id: "01a06575-97e9-7297-a735-e5b9012cc408",
  type: "page-type/world-skill",
  slug: "advanced-golem-shaping",
  title: "Advanced Golem Shaping",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
