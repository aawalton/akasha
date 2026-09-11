import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const manaShield = {
  id: "01a0657d-0242-721e-9fba-0fd304ed4731",
  type: "world-skill",
  slug: "mana-shield",
  title: "Mana Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
