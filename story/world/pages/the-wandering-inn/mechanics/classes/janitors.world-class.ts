import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const janitors = {
  id: "01a0657e-020b-7343-befb-1b1230267612",
  type: "page-type/world-class",
  slug: "janitors",
  title: "Janitors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
