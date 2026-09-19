import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spiritShamans = {
  id: "01a06586-0a51-764f-b836-395d3f7330fa",
  type: "page-type/world-class",
  slug: "spirit-shamans",
  title: "Spirit Shamans",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
