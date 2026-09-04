import type { WorldSpell } from "../../world-spell.page-type.ts"

export const empowerSpell = {
  id: "01a06572-95bf-7c51-a296-cf866716debb",
  pageTypeSlug: "world-spell",
  slug: "empower-spell",
  title: "Empower Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
