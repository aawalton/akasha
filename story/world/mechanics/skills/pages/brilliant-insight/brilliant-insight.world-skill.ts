import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const brilliantInsight = {
  id: "01a06575-97f9-7684-adc1-5d31ddedb053",
  type: "page-type/world-skill",
  slug: "brilliant-insight",
  title: "Brilliant Insight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
