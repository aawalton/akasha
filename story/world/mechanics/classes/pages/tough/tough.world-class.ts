import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tough = {
  id: "01a06586-0a68-773f-9a6f-6f384dcfa3e7",
  type: "page-type/world-class",
  slug: "tough",
  title: "Tough",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
