import type { WorldSpell } from "../../world-spell.page-type.ts"

export const blackShroud = {
  id: "01a06572-95b6-7bc2-8d2b-e22c79db5ed9",
  pageTypeSlug: "world-spell",
  slug: "black-shroud",
  title: "Black Shroud",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
