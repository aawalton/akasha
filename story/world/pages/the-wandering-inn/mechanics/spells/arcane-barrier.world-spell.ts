import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneBarrier = {
  id: "01a06572-95b4-7bb7-8bae-b717282eb6c1",
  type: "page-type/world-spell",
  slug: "arcane-barrier",
  title: "Arcane Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
