import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaBarrier = {
  id: "01a06572-95d1-7f49-9b00-53f2777d123a",
  type: "page-type/world-spell",
  slug: "mana-barrier",
  title: "Mana Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
