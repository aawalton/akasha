import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strummer = {
  id: "01a06586-0a5d-71d1-94a0-191cc4614e93",
  type: "page-type/world-class",
  slug: "strummer",
  title: "Strummer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
