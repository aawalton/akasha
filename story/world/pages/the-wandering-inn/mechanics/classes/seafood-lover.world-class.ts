import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seafoodLover = {
  id: "01a06586-0a2d-77e0-b24e-36a4e02555d1",
  type: "page-type/world-class",
  slug: "seafood-lover",
  title: "Seafood Lover",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
