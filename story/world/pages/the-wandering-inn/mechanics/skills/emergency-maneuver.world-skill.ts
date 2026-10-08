import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyManeuver = {
  id: "01a06575-9807-724e-8220-4fe02697a455",
  type: "page-type/world-skill",
  slug: "emergency-maneuver",
  title: "Emergency Maneuver",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
