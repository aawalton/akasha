import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warPrincess = {
  id: "01a06586-0a71-77eb-95eb-d2895d7347af",
  type: "page-type/world-class",
  slug: "war-princess",
  title: "War Princess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
