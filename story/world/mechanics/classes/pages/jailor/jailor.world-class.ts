import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const jailor = {
  id: "01a0657e-1377-7313-a96f-f5b569f5fd4e",
  type: "page-type/world-class",
  slug: "jailor",
  title: "Jailor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
