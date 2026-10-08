import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameSwathe = {
  id: "01a06572-95c3-7553-8d33-094762383c05",
  type: "page-type/world-spell",
  slug: "flame-swathe",
  title: "Flame Swathe",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
