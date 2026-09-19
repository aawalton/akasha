import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warLady = {
  id: "01a06586-0a71-713f-a963-8c9ee0b691e8",
  type: "page-type/world-class",
  slug: "war-lady",
  title: "War Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
