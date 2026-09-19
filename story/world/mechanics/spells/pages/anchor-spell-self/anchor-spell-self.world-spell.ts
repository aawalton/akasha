import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const anchorSpellSelf = {
  id: "01a06572-95b4-76a5-ba7b-1813be8ec269",
  type: "page-type/world-spell",
  slug: "anchor-spell-self",
  title: "Anchor Spell: Self",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
