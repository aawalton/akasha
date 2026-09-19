import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bookMerchant = {
  id: "01a0657e-01bf-7d9b-8dcc-f7463f733338",
  type: "page-type/world-class",
  slug: "book-merchant",
  title: "Book Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
