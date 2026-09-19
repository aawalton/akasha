import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bowyers = {
  id: "01a0657e-01c0-7ab2-9963-ed1d87a05e9c",
  type: "page-type/world-class",
  slug: "bowyers",
  title: "Bowyers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
