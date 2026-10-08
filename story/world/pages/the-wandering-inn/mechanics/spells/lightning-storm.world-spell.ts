import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningStorm = {
  id: "01a06572-95d0-73ca-a51b-23bc0e0b8a4e",
  type: "page-type/world-spell",
  slug: "lightning-storm",
  title: "Lightning Storm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
