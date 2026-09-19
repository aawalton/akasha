import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magus = {
  id: "01a0657e-022b-775f-bd46-9b508b224cf2",
  type: "page-type/world-class",
  slug: "magus",
  title: "Magus",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
