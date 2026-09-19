import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courtesan = {
  id: "01a0657e-01cc-7e04-b832-73ffc47f8882",
  type: "page-type/world-class",
  slug: "courtesan",
  title: "Courtesan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
