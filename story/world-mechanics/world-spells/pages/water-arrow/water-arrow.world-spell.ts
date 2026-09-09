import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterArrow = {
  id: "01a06572-95e9-7583-bb15-755d7f18237a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "water-arrow",
  title: "Water Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
