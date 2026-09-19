import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedLeadership = {
  id: "01a06575-97e9-7811-91c1-13ba04810409",
  type: "page-type/world-skill",
  slug: "advanced-leadership",
  title: "Advanced Leadership",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
