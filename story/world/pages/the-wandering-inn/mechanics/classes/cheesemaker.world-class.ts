import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cheesemaker = {
  id: "01a0657e-01c4-7161-a274-3043bcec22da",
  type: "page-type/world-class",
  slug: "cheesemaker",
  title: "Cheesemaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
