import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const armsMerchant = {
  id: "01a0657e-01ab-7b13-a416-c1da40930ca4",
  type: "page-type/world-class",
  slug: "arms-merchant",
  title: "Arms Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
