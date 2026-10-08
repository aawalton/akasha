import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const renewPlants = {
  id: "01a06572-95dd-7ccc-88b6-8718e396e249",
  type: "page-type/world-spell",
  slug: "renew-plants",
  title: "Renew Plants",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
