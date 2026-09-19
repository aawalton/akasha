import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const councilwoman = {
  id: "01a0657e-01ca-77cb-ac33-3e3c912da0fa",
  type: "page-type/world-class",
  slug: "councilwoman",
  title: "Councilwoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
