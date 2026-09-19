import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smithingChieftain = {
  id: "01a06586-0a44-7c51-b2f7-be9c55cacd5d",
  type: "page-type/world-class",
  slug: "smithing-chieftain",
  title: "Smithing Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
