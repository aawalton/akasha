import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const quartermaster = {
  id: "01a06586-0a1a-726f-98b4-b960a20bfbba",
  type: "page-type/world-class",
  slug: "quartermaster",
  title: "Quartermaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
