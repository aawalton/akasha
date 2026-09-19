import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heatResistance = {
  id: "01a06575-9819-7f8e-bb21-105877c9ed80",
  type: "page-type/world-skill",
  slug: "heat-resistance",
  title: "Heat Resist—",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
