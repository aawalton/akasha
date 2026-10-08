import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tidalWave = {
  id: "01a06572-95e7-7491-aa04-21916956f8e8",
  type: "page-type/world-spell",
  slug: "tidal-wave",
  title: "Tidal Wave",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
