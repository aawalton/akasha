import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eliteGuard = {
  id: "01a0657e-01d6-7341-8dfd-b566e7552fb2",
  type: "page-type/world-class",
  slug: "elite-guard",
  title: "Elite Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
