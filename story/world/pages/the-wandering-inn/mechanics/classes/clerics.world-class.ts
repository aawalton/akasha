import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clerics = {
  id: "01a0657e-01c7-7f70-86e7-8b458f16d9e0",
  type: "page-type/world-class",
  slug: "clerics",
  title: "Clerics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
