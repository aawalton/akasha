import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snowyBlast = {
  id: "01a06572-95e1-73fc-a217-5095a4c97fb5",
  type: "page-type/world-spell",
  slug: "snowy-blast",
  title: "Snowy Blast",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
