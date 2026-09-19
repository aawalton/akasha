import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaves = {
  id: "01a06586-0a42-7603-9e37-746df6932989",
  type: "page-type/world-class",
  slug: "slaves",
  title: "Slaves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
