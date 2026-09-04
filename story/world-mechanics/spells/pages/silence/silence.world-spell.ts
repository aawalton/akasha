import type { WorldSpell } from "../../world-spell.page-type.ts"

export const silence = {
  id: "01a06572-95e0-7ca6-8b6f-4152fbb5d799",
  pageTypeSlug: "world-spell",
  slug: "silence",
  title: "Silence",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
