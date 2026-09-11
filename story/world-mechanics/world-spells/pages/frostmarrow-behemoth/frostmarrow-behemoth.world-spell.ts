import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostmarrowBehemoth = {
  id: "01a06572-95c5-7122-9e7c-1e4a2740a70c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frostmarrow-behemoth",
  title: "Frostmarrow Behemoth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
