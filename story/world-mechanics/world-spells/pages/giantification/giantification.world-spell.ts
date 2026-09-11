import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const giantification = {
  id: "01a06572-95c6-792d-93d0-1a80918aa2d3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "giantification",
  title: "Giantification",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
