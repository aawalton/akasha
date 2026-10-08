import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const warmth = {
  id: "01a06572-95e9-7165-b4c1-161240f983d9",
  type: "page-type/world-spell",
  slug: "warmth",
  title: "Warmth",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
