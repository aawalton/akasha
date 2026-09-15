import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const emergencyBlock = {
  id: "01a06575-9807-7471-a02f-0f66305e0835",
  type: "world-skill",
  slug: "emergency-block",
  title: "Emergency Block",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
