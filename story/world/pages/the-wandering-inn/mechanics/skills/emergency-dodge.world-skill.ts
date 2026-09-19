import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyDodge = {
  id: "01a06575-9807-7297-8afe-5eeba08a43fe",
  type: "page-type/world-skill",
  slug: "emergency-dodge",
  title: "Emergency Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
