import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterwalking = {
  id: "01a06572-95e9-7d64-841c-ad6859f878a8",
  type: "page-type/world-spell",
  slug: "waterwalking",
  title: "Waterwalking",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
