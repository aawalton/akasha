import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const prince = {
  id: "01a06586-0a0d-72fd-934c-e1040b66f6bb",
  type: "world-class",
  slug: "prince",
  title: "Prince",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
