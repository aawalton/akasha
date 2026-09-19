import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyCharredSpellcasting = {
  id: "01a06575-97ec-7534-b609-1e597fe1ca8f",
  type: "page-type/world-skill",
  slug: "army-charred-spellcasting",
  title: "Army: Charred Spellcasting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
