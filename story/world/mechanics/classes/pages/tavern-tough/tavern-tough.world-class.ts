import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tavernTough = {
  id: "01a06586-0a63-79a0-893d-33aac1f87e9d",
  type: "page-type/world-class",
  slug: "tavern-tough",
  title: "Tavern Tough",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
