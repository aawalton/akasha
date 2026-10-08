import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfEradication = {
  id: "01a06572-95b5-7197-bb0c-32496044b589",
  type: "page-type/world-spell",
  slug: "barrier-of-eradication",
  title: "Barrier of Eradication",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
