import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalMerchant = {
  id: "01a0657e-0249-79a1-9a02-dbb2ca473dc4",
  type: "page-type/world-class",
  slug: "royal-merchant",
  title: "Royal Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
