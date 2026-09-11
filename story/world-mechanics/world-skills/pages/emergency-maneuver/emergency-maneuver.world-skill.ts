import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const emergencyManeuver = {
  id: "01a06575-9807-724e-8220-4fe02697a455",
  type: "world-skill",
  slug: "emergency-maneuver",
  title: "Emergency Maneuver",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
