import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const oarsmen = {
  id: "01a0657e-13b3-7a06-8fb9-d7b4a7d5a4b0",
  type: "page-type/world-class",
  slug: "oarsmen",
  title: "Oarsmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
