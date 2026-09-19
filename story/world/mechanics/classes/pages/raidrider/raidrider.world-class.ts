import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const raidrider = {
  id: "01a06586-0a1d-7ebc-a7b1-b457782b5118",
  type: "page-type/world-class",
  slug: "raidrider",
  title: "Raidrider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
