import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const apostle = {
  id: "01a0657e-01a8-7d4f-90b5-fe68ab72a09a",
  type: "page-type/world-class",
  slug: "apostle",
  title: "Apostle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
