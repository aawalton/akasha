import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfThorns = {
  id: "01a06572-95b5-7254-9141-79799566369e",
  type: "page-type/world-spell",
  slug: "barrier-of-thorns",
  title: "Barrier of Thorns",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
