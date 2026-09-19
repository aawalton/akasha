import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const enterprisingMerchant = {
  id: "01a0657e-1360-7348-a9fd-dd3b268ca57d",
  type: "page-type/world-class",
  slug: "enterprising-merchant",
  title: "Enterprising Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
