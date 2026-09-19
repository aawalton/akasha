import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sculptor = {
  id: "01a06586-0a2d-75ea-ad81-7873f50fb49c",
  type: "page-type/world-class",
  slug: "sculptor",
  title: "Sculptor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
