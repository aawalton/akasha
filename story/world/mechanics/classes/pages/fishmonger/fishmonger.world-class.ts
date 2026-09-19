import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fishmonger = {
  id: "01a0657e-1364-7509-98e1-fca35d76630f",
  type: "page-type/world-class",
  slug: "fishmonger",
  title: "Fishmonger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
