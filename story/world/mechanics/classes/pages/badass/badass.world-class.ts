import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const badass = {
  id: "01a0657e-1336-7e80-8dc8-763df6d1886d",
  type: "page-type/world-class",
  slug: "badass",
  title: "Badass",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
