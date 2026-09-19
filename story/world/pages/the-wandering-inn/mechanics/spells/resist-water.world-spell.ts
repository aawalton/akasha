import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const resistWater = {
  id: "01a06572-95dd-7d39-9526-2f5a041b2cd7",
  type: "page-type/world-spell",
  slug: "resist-water",
  title: "Resist Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
