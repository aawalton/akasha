import type { WorldSpell } from "../../world-spell.page-type.ts"

export const wardOfPurity = {
  id: "01a06572-95e9-71a4-85af-7082a5d185c4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ward-of-purity",
  title: "Ward of Purity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
