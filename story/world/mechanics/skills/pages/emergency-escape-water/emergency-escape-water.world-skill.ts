import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyEscapeWater = {
  id: "01a06575-9807-71fc-9252-08b3a6edc813",
  type: "page-type/world-skill",
  slug: "emergency-escape-water",
  title: "Emergency Escape: Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
