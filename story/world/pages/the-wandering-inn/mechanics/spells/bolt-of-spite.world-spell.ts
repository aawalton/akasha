import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boltOfSpite = {
  id: "01a06572-95b6-7787-b6b8-ade55a8e8ff9",
  type: "page-type/world-spell",
  slug: "bolt-of-spite",
  title: "Bolt of Spite",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
