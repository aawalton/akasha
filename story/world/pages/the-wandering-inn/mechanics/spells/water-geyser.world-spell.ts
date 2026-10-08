import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterGeyser = {
  id: "01a06572-95e9-73f6-924c-1a5352fa0df8",
  type: "page-type/world-spell",
  slug: "water-geyser",
  title: "Water Geyser",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
