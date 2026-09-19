import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prince = {
  id: "01a06586-0a0d-72fd-934c-e1040b66f6bb",
  type: "page-type/world-class",
  slug: "prince",
  title: "Prince",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
