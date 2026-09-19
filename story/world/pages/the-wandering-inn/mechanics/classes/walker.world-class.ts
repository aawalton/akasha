import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const walker = {
  id: "01a06586-0a71-7fa5-8f60-4005e7cf3258",
  type: "page-type/world-class",
  slug: "walker",
  title: "Walker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
