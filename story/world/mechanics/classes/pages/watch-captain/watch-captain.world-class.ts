import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const watchCaptain = {
  id: "01a06586-0a75-7d0b-85a1-2ca5d5711034",
  type: "page-type/world-class",
  slug: "watch-captain",
  title: "Watch Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
