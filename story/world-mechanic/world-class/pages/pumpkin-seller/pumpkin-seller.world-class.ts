import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const pumpkinSeller = {
  id: "01a06586-0a19-70c1-8eed-9fefb68dca42",
  type: "world-class",
  slug: "pumpkin-seller",
  title: "Pumpkin Seller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
