import type { WorldSpell } from "../../world-spell.page-type.ts"

export const arrowOfGravity = {
  id: "01a06572-95b4-7e38-9679-32d1879722e2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "arrow-of-gravity",
  title: "Arrow of Gravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
