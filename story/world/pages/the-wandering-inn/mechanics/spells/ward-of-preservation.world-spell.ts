import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardOfPreservation = {
  id: "01a06572-95e9-72aa-8d65-172cb4b20c39",
  type: "page-type/world-spell",
  slug: "ward-of-preservation",
  title: "Ward of Preservation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
