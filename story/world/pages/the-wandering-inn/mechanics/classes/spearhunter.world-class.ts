import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearhunter = {
  id: "01a06586-0a4e-75a3-8352-ae6a2f1c3863",
  type: "page-type/world-class",
  slug: "spearhunter",
  title: "Spearhunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
