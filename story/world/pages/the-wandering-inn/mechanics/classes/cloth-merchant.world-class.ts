import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clothMerchant = {
  id: "01a0657e-134b-7bd2-b43a-096ac532f90c",
  type: "page-type/world-class",
  slug: "cloth-merchant",
  title: "Cloth Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
