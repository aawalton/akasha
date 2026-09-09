import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spellMassiveExpansion = {
  id: "01a06572-95e2-7dcb-88ed-3875df36dcf9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spell-massive-expansion",
  title: "Spell: Massive Expansion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
