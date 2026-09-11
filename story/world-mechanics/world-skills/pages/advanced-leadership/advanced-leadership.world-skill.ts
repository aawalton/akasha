import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const advancedLeadership = {
  id: "01a06575-97e9-7811-91c1-13ba04810409",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "advanced-leadership",
  title: "Advanced Leadership",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
