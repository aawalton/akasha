import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const statistician = {
  id: "01a06586-0a53-7056-b4e7-96a37fd23e7c",
  type: "page-type/world-class",
  slug: "statistician",
  title: "Statistician",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
