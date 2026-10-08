import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const landbridge = {
  id: "01a06572-95cc-76a4-915c-6e5b252bbc95",
  type: "page-type/world-spell",
  slug: "landbridge",
  title: "Landbridge",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
