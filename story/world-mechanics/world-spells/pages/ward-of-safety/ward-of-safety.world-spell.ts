import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wardOfSafety = {
  id: "01a06572-95e9-7e09-98e5-661c8bc38bcf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ward-of-safety",
  title: "Ward of Safety",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
