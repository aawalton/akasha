import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cleanse = {
  id: "01a06572-95b9-77be-81df-cba07859bdf5",
  type: "page-type/world-spell",
  slug: "cleanse",
  title: "Cleanse",
  world: "world/the-wandering-inn",
  appearanceCount: 34,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
