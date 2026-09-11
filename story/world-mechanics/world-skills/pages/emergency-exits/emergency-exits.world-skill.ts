import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const emergencyExits = {
  id: "01a06575-9807-7eda-ae5c-78d4a00c00e8",
  type: "world-skill",
  slug: "emergency-exits",
  title: "Emergency Exits",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
