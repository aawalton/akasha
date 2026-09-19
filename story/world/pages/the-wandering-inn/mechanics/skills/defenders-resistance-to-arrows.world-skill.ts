import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const defendersResistanceToArrows = {
  id: "01a06575-9802-707b-97ea-e62d7eca90ca",
  type: "page-type/world-skill",
  slug: "defenders-resistance-to-arrows",
  title: "Defenders: Resistance to Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
