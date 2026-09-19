import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyExits = {
  id: "01a06575-9807-7eda-ae5c-78d4a00c00e8",
  type: "page-type/world-skill",
  slug: "emergency-exits",
  title: "Emergency Exits",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
