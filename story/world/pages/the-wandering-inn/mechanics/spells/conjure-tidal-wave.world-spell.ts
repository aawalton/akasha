import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const conjureTidalWave = {
  id: "01a06572-95ba-7b33-92cc-40d3fac94106",
  type: "page-type/world-spell",
  slug: "conjure-tidal-wave",
  title: "Conjure Tidal Wave",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.386Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
