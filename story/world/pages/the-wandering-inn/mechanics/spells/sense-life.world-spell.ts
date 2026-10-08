import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const senseLife = {
  id: "01a06572-95df-7d19-ae6f-968d7f2757ae",
  type: "page-type/world-spell",
  slug: "sense-life",
  title: "Sense Life",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
