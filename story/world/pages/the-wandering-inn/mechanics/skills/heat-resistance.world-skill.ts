import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heatResistance = {
  id: "01a06575-9819-7f8e-bb21-105877c9ed80",
  type: "page-type/world-skill",
  slug: "heat-resistance",
  title: "Heat Resist—",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
