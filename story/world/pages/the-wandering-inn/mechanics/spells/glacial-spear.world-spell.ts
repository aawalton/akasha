import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glacialSpear = {
  id: "01a06572-95c6-765f-be2f-7bd2a643d8cc",
  type: "page-type/world-spell",
  slug: "glacial-spear",
  title: "Glacial Spear",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
