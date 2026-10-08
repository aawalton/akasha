import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneBarrier = {
  id: "01a06572-95e3-708c-9743-420504779d67",
  type: "page-type/world-spell",
  slug: "stone-barrier",
  title: "Stone Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
