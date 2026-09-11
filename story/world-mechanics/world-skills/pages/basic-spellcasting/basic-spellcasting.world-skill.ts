import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicSpellcasting = {
  id: "01a06575-97f4-71ff-885e-dbb8f39dd32d",
  type: "world-skill",
  slug: "basic-spellcasting",
  title: "Basic Spellcasting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
