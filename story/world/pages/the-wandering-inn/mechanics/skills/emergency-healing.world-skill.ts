import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyHealing = {
  id: "01a06575-9807-716d-ba20-8c7efa6980ff",
  type: "page-type/world-skill",
  slug: "emergency-healing",
  title: "Emergency Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
