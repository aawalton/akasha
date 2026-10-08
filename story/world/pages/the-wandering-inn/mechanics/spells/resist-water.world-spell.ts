import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const resistWater = {
  id: "01a06572-95dd-7d39-9526-2f5a041b2cd7",
  type: "page-type/world-spell",
  slug: "resist-water",
  title: "Resist Water",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
