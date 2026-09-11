import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const repair = {
  id: "01a06572-95dd-7140-82be-b904b3bd6b85",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "repair",
  title: "Repair",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
