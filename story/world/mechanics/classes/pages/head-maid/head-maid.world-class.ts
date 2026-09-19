import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const headMaid = {
  id: "01a0657e-01ef-7dd7-9fff-b7778718a758",
  type: "page-type/world-class",
  slug: "head-maid",
  title: "Head Maid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
