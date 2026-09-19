import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const glassMerchant = {
  id: "01a0657e-01e2-75b7-8044-92617342b731",
  type: "page-type/world-class",
  slug: "glass-merchant",
  title: "Glass Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
