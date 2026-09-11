import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceLances = {
  id: "01a06572-95c9-78b7-9908-17fda3adf081",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ice-lances",
  title: "Ice Lances",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
