import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sculleryMaids = {
  id: "01a0657e-024b-7b0a-b3b7-3f075cb9993a",
  type: "page-type/world-class",
  slug: "scullery-maids",
  title: "Scullery Maids",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
