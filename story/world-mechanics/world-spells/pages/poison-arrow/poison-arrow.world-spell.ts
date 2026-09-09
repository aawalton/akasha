import type { WorldSpell } from "../../world-spell.page-type.ts"

export const poisonArrow = {
  id: "01a06572-95db-7ca2-9651-0ad9ce8f68ca",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "poison-arrow",
  title: "Poison Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
