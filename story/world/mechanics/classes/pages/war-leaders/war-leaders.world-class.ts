import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warLeaders = {
  id: "01a06586-0a71-75c1-af4a-68bf06508b78",
  type: "page-type/world-class",
  slug: "war-leaders",
  title: "War Leaders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
