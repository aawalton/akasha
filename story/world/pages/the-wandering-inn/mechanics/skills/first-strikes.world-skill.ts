import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const firstStrikes = {
  id: "01a06575-980d-7787-9e3f-adc7b4823b8d",
  type: "page-type/world-skill",
  slug: "first-strikes",
  title: "First Strikes",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.589Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
