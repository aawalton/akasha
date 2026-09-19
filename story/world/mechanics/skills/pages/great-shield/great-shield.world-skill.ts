import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greatShield = {
  id: "01a06575-9816-7139-9e66-0790911ca2c7",
  type: "page-type/world-skill",
  slug: "great-shield",
  title: "Great Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
