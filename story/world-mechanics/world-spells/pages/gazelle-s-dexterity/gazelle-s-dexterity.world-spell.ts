import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gazelleSDexterity = {
  id: "01a06572-95c6-743d-a9da-0654cb05dfde",
  type: "world-spell",
  slug: "gazelle-s-dexterity",
  title: "Gazelle’s Dexterity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
