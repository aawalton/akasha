import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfAir = {
  id: "01a06572-95b5-7e3e-ba34-fb7320108f2e",
  type: "page-type/world-spell",
  slug: "barrier-of-air",
  title: "Barrier of Air",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
