import type { WorldSpell } from "../../world-spell.page-type.ts"

export const trueSeeing = {
  id: "01a06572-95e7-770d-96d1-0a18290c64fd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "true-seeing",
  title: "True Seeing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
