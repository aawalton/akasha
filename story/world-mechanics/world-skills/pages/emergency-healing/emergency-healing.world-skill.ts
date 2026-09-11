import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const emergencyHealing = {
  id: "01a06575-9807-716d-ba20-8c7efa6980ff",
  type: "world-skill",
  slug: "emergency-healing",
  title: "Emergency Healing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
