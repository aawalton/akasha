import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const steelBody = {
  id: "01a06572-95e2-7d39-8439-094e6292c69d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "steel-body",
  title: "Steel Body",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
