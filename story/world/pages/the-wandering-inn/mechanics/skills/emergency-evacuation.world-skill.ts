import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyEvacuation = {
  id: "01a06575-9807-76d5-b477-905f51e1b733",
  type: "page-type/world-skill",
  slug: "emergency-evacuation",
  title: "Emergency Evacuation",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
