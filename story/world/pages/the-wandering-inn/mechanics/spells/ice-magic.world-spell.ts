import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceMagic = {
  id: "01a06572-95c9-7aba-ab5e-fa3beba271ba",
  type: "page-type/world-spell",
  slug: "ice-magic",
  title: "Ice Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
