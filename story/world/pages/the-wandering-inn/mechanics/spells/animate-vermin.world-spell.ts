import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const animateVermin = {
  id: "01a06572-95b4-7d25-8fa4-accb0a0ee5c2",
  type: "page-type/world-spell",
  slug: "animate-vermin",
  title: "Animate Vermin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
