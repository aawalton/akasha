import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const priestess = {
  id: "01a06586-0a0c-74f3-b201-8f6b5b3a81aa",
  type: "page-type/world-class",
  slug: "priestess",
  title: "Priestess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
