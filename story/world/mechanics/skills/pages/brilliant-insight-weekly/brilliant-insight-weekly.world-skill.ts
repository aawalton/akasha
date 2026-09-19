import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const brilliantInsightWeekly = {
  id: "01a06575-97f9-79bf-9251-4aa34b25c6d2",
  type: "page-type/world-skill",
  slug: "brilliant-insight-weekly",
  title: "Brilliant Insight (Weekly)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
