import type { WorldSpell } from "../../world-spell.page-type.ts"

export const earthquake = {
  id: "01a06572-95bf-7955-84ac-da2026dc9028",
  pageTypeSlug: "world-spell",
  slug: "earthquake",
  title: "Earthquake",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
