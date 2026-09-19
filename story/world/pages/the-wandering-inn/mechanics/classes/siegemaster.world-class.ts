import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const siegemaster = {
  id: "01a0657e-0255-7578-8203-46cea461d883",
  type: "page-type/world-class",
  slug: "siegemaster",
  title: "Siegemaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
