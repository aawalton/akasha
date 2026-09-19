import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scriveners = {
  id: "01a06586-0a2d-781f-9784-b1048d2f2166",
  type: "page-type/world-class",
  slug: "scriveners",
  title: "Scriveners",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
