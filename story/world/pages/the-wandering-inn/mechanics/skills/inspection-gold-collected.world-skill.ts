import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inspectionGoldCollected = {
  id: "01a06575-981f-7b2b-af24-8d4481b8d53b",
  type: "page-type/world-skill",
  slug: "inspection-gold-collected",
  title: "Inspection: Gold Collected",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
