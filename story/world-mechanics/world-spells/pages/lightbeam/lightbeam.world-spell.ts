import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightbeam = {
  id: "01a06572-95cf-71d9-81d0-5aae5477cabc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightbeam",
  title: "Lightbeam",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
