import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const giantification = {
  id: "01a06572-95c6-792d-93d0-1a80918aa2d3",
  type: "page-type/world-spell",
  slug: "giantification",
  title: "Giantification",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
