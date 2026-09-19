import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const honorableThief = {
  id: "01a0657e-01f9-77ea-afe2-b63424cbad29",
  type: "page-type/world-class",
  slug: "honorable-thief",
  title: "Honorable Thief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
