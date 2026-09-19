import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farmers = {
  id: "01a0657e-01db-7a8d-87b6-afbea5318dac",
  type: "page-type/world-class",
  slug: "farmers",
  title: "Farmers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
