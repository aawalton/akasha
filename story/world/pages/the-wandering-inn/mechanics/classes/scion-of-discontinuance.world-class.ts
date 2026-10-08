import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scionOfDiscontinuance = {
  id: "01a0657e-024a-7169-8707-80e68ada7db4",
  type: "page-type/world-class",
  slug: "scion-of-discontinuance",
  title: "Scion of Discontinuance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/doorgnoll"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.074Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
