import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const foodie = {
  id: "01a0657e-01dd-7484-83fc-008e9a120659",
  type: "page-type/world-class",
  slug: "foodie",
  title: "Foodie",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
