import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicSpellcasting = {
  id: "01a06575-97f4-71ff-885e-dbb8f39dd32d",
  type: "page-type/world-skill",
  slug: "basic-spellcasting",
  title: "Basic Spellcasting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
