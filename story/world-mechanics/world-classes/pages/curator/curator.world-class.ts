import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const curator = {
  id: "01a0657e-1351-7ead-ada2-97876459a9df",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "curator",
  title: "Curator",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
