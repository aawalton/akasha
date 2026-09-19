import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const auctioneer = {
  id: "01a0657e-1336-795c-8735-50163a6d83a4",
  type: "page-type/world-class",
  slug: "auctioneer",
  title: "Auctioneer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
