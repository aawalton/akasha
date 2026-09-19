import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const priestsOfWar = {
  id: "01a0657e-023f-7d78-b620-7ade6dbf4a39",
  type: "page-type/world-class",
  slug: "priests-of-war",
  title: "Priests of War",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
