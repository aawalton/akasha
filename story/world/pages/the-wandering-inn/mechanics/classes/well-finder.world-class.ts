import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wellFinder = {
  id: "01a06586-0a76-76ed-a8f5-dabf7d99b027",
  type: "page-type/world-class",
  slug: "well-finder",
  title: "Well Finder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
