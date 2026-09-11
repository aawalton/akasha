import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const djinnSLegacySeeker = {
  id: "01a0657e-1354-7e40-9421-d3552c7e56ab",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "djinn-s-legacy-seeker",
  title: "Djinn’s Legacy Seeker",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["seeker"],
  references: "jsonl",
} as const satisfies WorldClass
