import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ravager = {
  id: "01a06586-0a1e-7cfc-af26-aa7b181f7e39",
  type: "page-type/world-class",
  slug: "ravager",
  title: "Ravager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
