import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guardsmen = {
  id: "01a0657e-136f-738e-a1d0-9f39fb4ef3f2",
  type: "page-type/world-class",
  slug: "guardsmen",
  title: "Guardsmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
