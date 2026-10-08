import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spearsOfLight = {
  id: "01a06572-95e1-7702-944b-475f13d4afc5",
  type: "page-type/world-spell",
  slug: "spears-of-light",
  title: "Spears of Light",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
