import type { WorldSpell } from "../../world-spell.page-type.ts"

export const truthSpell = {
  id: "01a06572-95e7-7a80-a3a7-46d7eace80bd",
  pageTypeSlug: "world-spell",
  slug: "truth-spell",
  title: "Truth Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
