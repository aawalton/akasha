import type { WorldSpell } from "../../world-spell.page-type.ts"

export const geomancy = {
  id: "01a06572-95c6-79b4-a1df-da45a5162d71",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "geomancy",
  title: "Geomancy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
