import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fullPowerThrow = {
  id: "01a06575-9811-7ade-93c1-de6e38678462",
  type: "page-type/world-skill",
  slug: "full-power-throw",
  title: "Full Power Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
