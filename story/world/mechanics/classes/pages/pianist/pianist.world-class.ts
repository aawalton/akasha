import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pianist = {
  id: "01a06586-0a06-75f1-8f99-71db1ee14ed5",
  type: "page-type/world-class",
  slug: "pianist",
  title: "Pianist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
