import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const aerialShield = {
  id: "01a06572-95b3-7473-82e5-9c846cf0c973",
  type: "page-type/world-spell",
  slug: "aerial-shield",
  title: "Aerial Shield",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
