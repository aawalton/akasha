import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const woodworkers = {
  id: "01a0657e-0272-7036-9d21-59e80e89c1d4",
  type: "page-type/world-class",
  slug: "woodworkers",
  title: "Woodworkers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
