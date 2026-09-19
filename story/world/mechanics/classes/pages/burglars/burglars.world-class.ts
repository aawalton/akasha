import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const burglars = {
  id: "01a0657e-1341-7372-a78c-df286e7339fa",
  type: "page-type/world-class",
  slug: "burglars",
  title: "Burglars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
