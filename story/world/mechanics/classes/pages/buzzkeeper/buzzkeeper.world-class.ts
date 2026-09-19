import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const buzzkeeper = {
  id: "01a0657e-1342-7a80-9c30-966aa4668f2b",
  type: "page-type/world-class",
  slug: "buzzkeeper",
  title: "Buzzkeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
