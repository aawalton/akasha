import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pettyThief = {
  id: "01a0657e-0237-77f6-a495-39e8c17a662c",
  type: "page-type/world-class",
  slug: "petty-thief",
  title: "Petty Thief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
