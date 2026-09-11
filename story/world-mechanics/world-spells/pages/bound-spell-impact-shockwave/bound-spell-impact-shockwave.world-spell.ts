import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boundSpellImpactShockwave = {
  id: "01a06572-95b7-768b-b1ed-5305cb65728b",
  type: "world-spell",
  slug: "bound-spell-impact-shockwave",
  title: "Bound Spell: Impact Shockwave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
