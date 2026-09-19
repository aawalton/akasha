import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pizzaKnight = {
  id: "01a06586-0a09-70f2-bfca-9d6b434e734f",
  type: "page-type/world-class",
  slug: "pizza-knight",
  title: "Pizza Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
