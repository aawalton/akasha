import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterproofing = {
  id: "01a06572-95e9-7aa5-80bf-1e298a03248a",
  type: "page-type/world-spell",
  slug: "waterproofing",
  title: "Waterproofing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
