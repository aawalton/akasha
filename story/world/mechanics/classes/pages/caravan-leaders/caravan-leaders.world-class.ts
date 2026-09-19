import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravanLeaders = {
  id: "01a0657e-1346-7aa3-a582-f6fe14aa9b9a",
  type: "page-type/world-class",
  slug: "caravan-leaders",
  title: "Caravan Leaders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
