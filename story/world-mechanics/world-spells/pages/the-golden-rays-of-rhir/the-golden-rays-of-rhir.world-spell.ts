import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const theGoldenRaysOfRhir = {
  id: "01a06572-95e6-7725-8b27-e13a26339e5a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "the-golden-rays-of-rhir",
  title: "The Golden Rays of Rhir",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
