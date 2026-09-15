import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const increasedIncome = {
  id: "01a06575-981e-75d9-bc42-45de90fe9791",
  type: "world-skill",
  slug: "increased-income",
  title: "Increased Income",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
