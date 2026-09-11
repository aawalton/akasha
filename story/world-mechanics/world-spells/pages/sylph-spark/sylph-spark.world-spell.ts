import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sylphSpark = {
  id: "01a06572-95e5-73ac-8cba-5f7ae3b96a9f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sylph-spark",
  title: "Sylph Spark",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
