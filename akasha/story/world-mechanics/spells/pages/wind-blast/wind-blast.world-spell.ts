import type { WorldSpell } from "../../world-spell.page-type.ts"

export const windBlast = {
  id: "01a06572-95ea-7f79-8dbf-41cf095e0cc1",
  pageTypeSlug: "world-spell",
  slug: "wind-blast",
  title: "Wind Blast",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
