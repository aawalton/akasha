import type { WorldSpell } from "../../world-spell.page-type.ts"

export const cleanse = {
  id: "01a06572-95b9-77be-81df-cba07859bdf5",
  pageTypeSlug: "world-spell",
  slug: "cleanse",
  title: "Cleanse",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
