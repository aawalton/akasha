import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windResistance = {
  id: "01a06572-95ea-7bad-a8a3-192e990fa353",
  type: "page-type/world-spell",
  slug: "wind-resistance",
  title: "Wind Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
