import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const windResistance = {
  id: "01a06572-95ea-7bad-a8a3-192e990fa353",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wind-resistance",
  title: "Wind Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
