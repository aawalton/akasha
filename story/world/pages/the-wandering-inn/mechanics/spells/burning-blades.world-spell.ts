import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const burningBlades = {
  id: "01a06572-95b8-7466-b9a3-11d130909c81",
  type: "page-type/world-spell",
  slug: "burning-blades",
  title: "Burning Blades",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
