import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const abbot = {
  id: "01a0657e-1323-7ac9-8b54-604d6deca582",
  type: "page-type/world-class",
  slug: "abbot",
  title: "Abbot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
