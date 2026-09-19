import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flightOfThePhoenixKing = {
  id: "01a06572-95c4-7a72-b688-fbf583e6a43d",
  type: "page-type/world-spell",
  slug: "flight-of-the-phoenix-king",
  title: "Flight of the Phoenix King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
