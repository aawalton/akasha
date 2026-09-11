import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bishop = {
  id: "01a0657e-133e-70e8-af8a-8afef4918aa2",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bishop",
  title: "Bishop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
