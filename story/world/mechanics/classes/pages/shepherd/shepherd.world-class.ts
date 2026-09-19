import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shepherd = {
  id: "01a06586-0a3a-7d48-85b3-4ef3007492a7",
  type: "page-type/world-class",
  slug: "shepherd",
  title: "Shepherd",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
