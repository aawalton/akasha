import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boundSpellCleanse = {
  id: "01a06572-95b7-7178-867a-f97e2a7391d7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bound-spell-cleanse",
  title: "Bound Spell: Cleanse",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
