import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const newspaperManager = {
  id: "01a0657e-0234-766e-a6c7-680088704336",
  type: "world-class",
  slug: "newspaper-manager",
  title: "Newspaper Manager",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
