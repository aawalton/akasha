import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const wizards = {
  id: "01a06586-0a83-7e34-a5c8-cc407ab0c25e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "wizards",
  title: "Wizards",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
