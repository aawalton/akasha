import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const craftsman = {
  id: "01a0657e-1350-7213-b42f-533ffc6697a3",
  type: "page-type/world-class",
  slug: "craftsman",
  title: "Craftsman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
