import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const diamondheart = {
  id: "01a06572-95bd-7509-b860-770b62fac209",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "diamondheart",
  title: "Diamondheart",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
