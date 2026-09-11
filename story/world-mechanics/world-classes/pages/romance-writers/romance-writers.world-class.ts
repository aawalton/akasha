import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const romanceWriters = {
  id: "01a06586-0a25-73c1-8d02-910e896dd78b",
  type: "world-class",
  slug: "romance-writers",
  title: "Romance Writers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
