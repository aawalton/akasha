import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const patron = {
  id: "01a0657e-0236-7ff9-b68c-c2a03773bb97",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "patron",
  title: "Patron",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
