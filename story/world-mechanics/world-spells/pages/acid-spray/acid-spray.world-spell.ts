import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const acidSpray = {
  id: "01a06572-95b3-7d4c-9737-aa3986bf84c8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "acid-spray",
  title: "Acid Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
