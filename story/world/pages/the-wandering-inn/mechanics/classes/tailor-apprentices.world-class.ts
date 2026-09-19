import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tailorApprentices = {
  id: "01a06586-0a63-7b70-af2e-3af6109e7cd6",
  type: "page-type/world-class",
  slug: "tailor-apprentices",
  title: "Tailor Apprentices",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
