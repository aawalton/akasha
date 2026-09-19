import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warChieftain = {
  id: "01a06586-0a71-76dd-a2af-97ee85257829",
  type: "page-type/world-class",
  slug: "war-chieftain",
  title: "War Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
