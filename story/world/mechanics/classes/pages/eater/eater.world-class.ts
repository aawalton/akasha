import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eater = {
  id: "01a0657e-01d5-7e51-8212-4f1db36c2e37",
  type: "page-type/world-class",
  slug: "eater",
  title: "Eater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
