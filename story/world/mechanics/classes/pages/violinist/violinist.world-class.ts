import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const violinist = {
  id: "01a06586-0a70-713b-a990-8a2e88dec42e",
  type: "page-type/world-class",
  slug: "violinist",
  title: "Violinist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
