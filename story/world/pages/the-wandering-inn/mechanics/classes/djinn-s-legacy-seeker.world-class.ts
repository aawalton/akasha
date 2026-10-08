import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const djinnSLegacySeeker = {
  id: "01a0657e-1354-7e40-9421-d3552c7e56ab",
  type: "page-type/world-class",
  slug: "djinn-s-legacy-seeker",
  title: "Djinn’s Legacy Seeker",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/seeker"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.436Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
