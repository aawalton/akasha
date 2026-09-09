import type { WorldSpell } from "../../world-spell.page-type.ts"

export const boundSpells = {
  id: "01a06572-95b7-70f7-910b-eabd7d105243",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bound-spells",
  title: "Bound Spells",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
