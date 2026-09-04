import type { WorldSpell } from "../../world-spell.page-type.ts"

export const haltSpell = {
  id: "01a06572-95c8-7325-988a-e4c7b8dbd145",
  pageTypeSlug: "world-spell",
  slug: "halt-spell",
  title: "Halt Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
