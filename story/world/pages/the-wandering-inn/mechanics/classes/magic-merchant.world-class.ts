import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicMerchant = {
  id: "01a0657e-022a-77b0-bbfe-be7b2c849254",
  type: "page-type/world-class",
  slug: "magic-merchant",
  title: "Magic Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
