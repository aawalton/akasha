import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyHealing = {
  id: "01a06575-9807-716d-ba20-8c7efa6980ff",
  type: "page-type/world-skill",
  slug: "emergency-healing",
  title: "Emergency Healing",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
