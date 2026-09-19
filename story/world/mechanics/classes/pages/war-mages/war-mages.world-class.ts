import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warMages = {
  id: "01a06586-0a71-734b-befa-25c4f844f240",
  type: "page-type/world-class",
  slug: "war-mages",
  title: "War Mages",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
