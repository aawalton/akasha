import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weavers = {
  id: "01a0657e-0271-7392-b2b2-c6c25b2a4e2a",
  type: "page-type/world-class",
  slug: "weavers",
  title: "Weavers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
