import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const infuseSpellPoison = {
  id: "01a06572-95cb-7698-ab2f-6e284ab63fda",
  type: "page-type/world-spell",
  slug: "infuse-spell-poison",
  title: "Infuse Spell: Poison",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
