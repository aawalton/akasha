import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const haste = {
  id: "01a06572-95c8-79db-8d52-bdd02b466a0a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "haste",
  title: "Haste",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
