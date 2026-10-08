import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningArrows = {
  id: "01a06572-95cf-7305-9674-2d34b3884c84",
  type: "page-type/world-spell",
  slug: "lightning-arrows",
  title: "Lightning Arrows",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
