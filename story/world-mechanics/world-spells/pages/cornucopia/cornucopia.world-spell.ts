import type { WorldSpell } from "../../world-spell.page-type.ts"

export const cornucopia = {
  id: "01a06572-95bb-7c0f-a2ce-4e51a4559f29",
  pageTypeSlug: "world-spell",
  slug: "cornucopia",
  title: "Cornucopia",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
