import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfLight = {
  id: "01a06572-95b5-775b-993b-19a935c8c967",
  type: "page-type/world-spell",
  slug: "barrier-of-light",
  title: "Barrier of Light",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
