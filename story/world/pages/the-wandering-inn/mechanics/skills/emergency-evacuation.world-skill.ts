import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyEvacuation = {
  id: "01a06575-9807-76d5-b477-905f51e1b733",
  type: "page-type/world-skill",
  slug: "emergency-evacuation",
  title: "Emergency Evacuation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
