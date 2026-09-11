import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const followTheTrend = {
  id: "01a06575-980f-7e4d-b6b8-91e64aa50416",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "follow-the-trend",
  title: "Follow the Trend",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
