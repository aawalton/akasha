import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lumberjack = {
  id: "01a0657e-1391-7b5e-a40d-685f99f485aa",
  type: "page-type/world-class",
  slug: "lumberjack",
  title: "Lumberjack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
