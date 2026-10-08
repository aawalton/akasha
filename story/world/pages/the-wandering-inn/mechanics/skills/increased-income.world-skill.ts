import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedIncome = {
  id: "01a06575-981e-75d9-bc42-45de90fe9791",
  type: "page-type/world-skill",
  slug: "increased-income",
  title: "Increased Income",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.606Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
