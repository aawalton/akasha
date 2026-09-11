import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const auctioneer = {
  id: "01a0657e-1336-795c-8735-50163a6d83a4",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "auctioneer",
  title: "Auctioneer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
