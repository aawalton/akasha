import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceLances = {
  id: "01a06572-95c9-78b7-9908-17fda3adf081",
  type: "page-type/world-spell",
  slug: "ice-lances",
  title: "Ice Lances",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
