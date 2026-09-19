import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const teaMerchant = {
  id: "01a06586-0a64-7b26-8ff3-4da11b691d6b",
  type: "page-type/world-class",
  slug: "tea-merchant",
  title: "Tea Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
