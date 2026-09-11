import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const scionOfDiscontinuance = {
  id: "01a0657e-024a-7169-8707-80e68ada7db4",
  type: "world-class",
  slug: "scion-of-discontinuance",
  title: "Scion of Discontinuance",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["doorgnoll"],
  references: "jsonl",
} as const satisfies WorldClass
