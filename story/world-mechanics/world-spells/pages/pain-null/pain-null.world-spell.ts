import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const painNull = {
  id: "01a06572-95da-7ea1-8e36-085e54c43d65",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "pain-null",
  title: "Pain Null",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
