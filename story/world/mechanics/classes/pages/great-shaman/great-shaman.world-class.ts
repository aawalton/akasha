import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greatShaman = {
  id: "01a0657e-136e-75cf-b5f5-a629ee9d0c71",
  type: "page-type/world-class",
  slug: "great-shaman",
  title: "Great Shaman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
