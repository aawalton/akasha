import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcOfMidnight = {
  id: "01a06572-95b4-7183-aff0-bdc739f4fd07",
  type: "page-type/world-spell",
  slug: "arc-of-midnight",
  title: "Arc of Midnight",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
