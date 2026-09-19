import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stonemasons = {
  id: "01a06586-0a54-7f74-b429-78ff7a4887f7",
  type: "page-type/world-class",
  slug: "stonemasons",
  title: "Stonemasons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
