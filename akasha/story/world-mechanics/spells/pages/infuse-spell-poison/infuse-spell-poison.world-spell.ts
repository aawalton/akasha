import type { WorldSpell } from "../../world-spell.page-type.ts"

export const infuseSpellPoison = {
  id: "01a06572-95cb-7698-ab2f-6e284ab63fda",
  pageTypeSlug: "world-spell",
  slug: "infuse-spell-poison",
  title: "Infuse Spell: Poison",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
