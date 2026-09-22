import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gemMerchant = {
  id: "01a0657e-1367-7845-985c-12ac187114fc",
  type: "page-type/world-class",
  slug: "gem-merchant",
  title: "Gem Merchant",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
} as const satisfies WorldClass
