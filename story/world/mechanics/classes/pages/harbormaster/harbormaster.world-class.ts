import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const harbormaster = {
  id: "01a0657e-1370-7745-afed-f9c3439a91c6",
  type: "page-type/world-class",
  slug: "harbormaster",
  title: "Harbormaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
