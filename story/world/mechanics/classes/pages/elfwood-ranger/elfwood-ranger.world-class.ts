import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const elfwoodRanger = {
  id: "01a0657e-1359-7665-b35c-7ad6c13953f3",
  type: "page-type/world-class",
  slug: "elfwood-ranger",
  title: "Elfwood Ranger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
