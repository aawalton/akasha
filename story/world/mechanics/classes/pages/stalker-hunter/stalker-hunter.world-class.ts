import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stalkerHunter = {
  id: "01a06586-0a52-72a7-be59-c2daf4117196",
  type: "page-type/world-class",
  slug: "stalker-hunter",
  title: "Stalker Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
