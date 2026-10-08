import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterOrb = {
  id: "01a06572-95e9-7c53-8930-acfa3a258f39",
  type: "page-type/world-spell",
  slug: "water-orb",
  title: "Water Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
