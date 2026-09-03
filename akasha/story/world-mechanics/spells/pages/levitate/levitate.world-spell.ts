import type { WorldSpell } from "../../world-spell.page-type.ts"

export const levitate = {
  id: "01a06572-95cd-79a6-a76d-dce8b1f9f5ba",
  pageTypeSlug: "world-spell",
  slug: "levitate",
  title: "Levitate",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
