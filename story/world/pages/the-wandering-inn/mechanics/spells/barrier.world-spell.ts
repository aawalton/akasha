import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrier = {
  id: "01a06572-95b5-7521-9ec5-9a58dc32d1e3",
  type: "page-type/world-spell",
  slug: "barrier",
  title: "Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
