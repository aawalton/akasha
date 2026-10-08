import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const speedSpell = {
  id: "01a06572-95e2-7d99-92f2-c5033aeef0ef",
  type: "page-type/world-spell",
  slug: "speed-spell",
  title: "Speed Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
