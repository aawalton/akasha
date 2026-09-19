import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalMagician = {
  id: "01a06586-0a26-7655-b815-10c74ec34d46",
  type: "page-type/world-class",
  slug: "royal-magician",
  title: "Royal Magician",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
