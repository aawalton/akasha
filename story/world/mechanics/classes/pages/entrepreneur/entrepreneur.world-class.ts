import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const entrepreneur = {
  id: "01a0657e-01d9-7286-843a-36cead8ab85c",
  type: "page-type/world-class",
  slug: "entrepreneur",
  title: "Entrepreneur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
