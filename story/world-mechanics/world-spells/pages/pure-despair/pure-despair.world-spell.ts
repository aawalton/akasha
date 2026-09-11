import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pureDespair = {
  id: "01a06572-95db-708e-b75a-22d075127792",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "pure-despair",
  title: "Pure Despair",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
