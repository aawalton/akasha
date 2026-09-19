import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const paintMerchant = {
  id: "01a0657e-13b4-7012-ba11-a31e2a3e71bb",
  type: "page-type/world-class",
  slug: "paint-merchant",
  title: "Paint Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
