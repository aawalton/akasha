import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cultists = {
  id: "01a0657e-1351-7cf8-b480-18d117240858",
  type: "page-type/world-class",
  slug: "cultists",
  title: "Cultists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
