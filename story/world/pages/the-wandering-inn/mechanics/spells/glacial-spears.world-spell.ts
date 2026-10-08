import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glacialSpears = {
  id: "01a06572-95c6-7b7d-ab7d-ede8d50c814f",
  type: "page-type/world-spell",
  slug: "glacial-spears",
  title: "Glacial Spears",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
