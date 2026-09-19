import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardOfPurity = {
  id: "01a06572-95e9-71a4-85af-7082a5d185c4",
  type: "page-type/world-spell",
  slug: "ward-of-purity",
  title: "Ward of Purity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
