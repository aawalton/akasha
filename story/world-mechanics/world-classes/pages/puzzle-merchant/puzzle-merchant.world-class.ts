import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const puzzleMerchant = {
  id: "01a06586-0a1a-7f5c-aabd-969889e96698",
  type: "world-class",
  slug: "puzzle-merchant",
  title: "Puzzle Merchant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
