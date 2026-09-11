import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const courier = {
  id: "01a0657e-134f-76ff-8225-336c9b550f9c",
  type: "world-class",
  slug: "courier",
  title: "Courier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
