import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashfireSpellcraft = {
  id: "01a06575-980e-7552-b43b-775d3db546f9",
  type: "page-type/world-skill",
  slug: "flashfire-spellcraft",
  title: "Flashfire Spellcraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
