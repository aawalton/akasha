import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lord = {
  id: "01a0657e-0220-7f4b-8d41-e32759c4b8fd",
  type: "page-type/world-class",
  slug: "lord",
  title: "Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
