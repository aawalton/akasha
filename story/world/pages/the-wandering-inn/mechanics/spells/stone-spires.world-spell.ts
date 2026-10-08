import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSpires = {
  id: "01a06572-95e3-7359-9a1e-044d521cd2a5",
  type: "page-type/world-spell",
  slug: "stone-spires",
  title: "Stone Spires",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
