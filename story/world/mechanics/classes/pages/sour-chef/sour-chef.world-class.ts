import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sourChef = {
  id: "01a06586-0a4e-7c74-bd2b-d1a00560a9ca",
  type: "page-type/world-class",
  slug: "sour-chef",
  title: "Sour Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
