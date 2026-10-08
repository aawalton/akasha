import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterJet = {
  id: "01a06572-95e9-7aea-b02e-4917d84ed567",
  type: "page-type/world-spell",
  slug: "water-jet",
  title: "Water Jet",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
