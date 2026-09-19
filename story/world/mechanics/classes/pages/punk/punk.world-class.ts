import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const punk = {
  id: "01a06586-0a19-7208-a663-577a8e86779a",
  type: "page-type/world-class",
  slug: "punk",
  title: "Punk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
