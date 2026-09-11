import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const infuseSpellPoison = {
  id: "01a06572-95cb-7698-ab2f-6e284ab63fda",
  type: "world-spell",
  slug: "infuse-spell-poison",
  title: "Infuse Spell: Poison",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
