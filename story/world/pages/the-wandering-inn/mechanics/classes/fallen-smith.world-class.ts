import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fallenSmith = {
  id: "01a0657e-1361-7248-82c7-be1d7a5ebc53",
  type: "page-type/world-class",
  slug: "fallen-smith",
  title: "Fallen Smith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
