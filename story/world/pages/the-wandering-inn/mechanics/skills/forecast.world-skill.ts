import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forecast = {
  id: "01a06575-980f-7857-ac5d-b82598e8e8ea",
  type: "page-type/world-skill",
  slug: "forecast",
  title: "Forecast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
