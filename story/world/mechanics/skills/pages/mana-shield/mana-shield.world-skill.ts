import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaShield = {
  id: "01a0657d-0242-721e-9fba-0fd304ed4731",
  type: "page-type/world-skill",
  slug: "mana-shield",
  title: "Mana Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
