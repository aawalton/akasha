import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sharpener = {
  id: "01a06586-0a3a-72e1-938a-08da88fb155b",
  type: "page-type/world-class",
  slug: "sharpener",
  title: "Sharpener",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
