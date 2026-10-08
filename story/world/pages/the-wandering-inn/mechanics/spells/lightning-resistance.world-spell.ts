import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningResistance = {
  id: "01a06572-95d0-74a7-ace7-287c8a01fce9",
  type: "page-type/world-spell",
  slug: "lightning-resistance",
  title: "Lightning Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
