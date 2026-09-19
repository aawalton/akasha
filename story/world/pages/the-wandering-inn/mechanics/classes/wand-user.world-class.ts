import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wandUser = {
  id: "01a06586-0a71-73dc-a3f4-b4eb7beef0d7",
  type: "page-type/world-class",
  slug: "wand-user",
  title: "Wand User",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
