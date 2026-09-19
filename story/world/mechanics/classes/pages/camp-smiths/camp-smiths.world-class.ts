import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const campSmiths = {
  id: "01a0657e-1342-73c9-9b0e-be90364ffbc5",
  type: "page-type/world-class",
  slug: "camp-smiths",
  title: "Camp Smiths",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
