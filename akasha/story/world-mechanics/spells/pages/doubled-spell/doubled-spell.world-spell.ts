import type { WorldSpell } from "../../world-spell.page-type.ts"

export const doubledSpell = {
  id: "01a06572-95be-7c78-9177-dea6aa1dabfe",
  pageTypeSlug: "world-spell",
  slug: "doubled-spell",
  title: "Doubled Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
