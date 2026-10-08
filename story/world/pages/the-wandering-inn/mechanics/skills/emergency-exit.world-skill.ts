import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyExit = {
  id: "01a06575-9807-7952-a37e-5b6c2d9195f4",
  type: "page-type/world-skill",
  slug: "emergency-exit",
  title: "Emergency Exit",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
