import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const animateDraugr = {
  id: "01a06572-95b4-7cf5-8797-ccc5b6c88467",
  type: "page-type/world-spell",
  slug: "animate-draugr",
  title: "Animate Draugr",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
