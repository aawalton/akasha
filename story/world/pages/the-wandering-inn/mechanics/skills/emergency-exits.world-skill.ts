import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyExits = {
  id: "01a06575-9807-7eda-ae5c-78d4a00c00e8",
  type: "page-type/world-skill",
  slug: "emergency-exits",
  title: "Emergency Exits",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
