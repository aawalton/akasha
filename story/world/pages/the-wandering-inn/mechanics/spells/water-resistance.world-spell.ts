import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterResistance = {
  id: "01a06572-95e9-7d66-badc-b63afffab7ce",
  type: "page-type/world-spell",
  slug: "water-resistance",
  title: "Water Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
