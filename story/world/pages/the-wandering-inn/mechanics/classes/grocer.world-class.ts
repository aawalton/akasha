import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const grocer = {
  id: "01a0657e-136e-7e4c-925a-ad718d49d995",
  type: "page-type/world-class",
  slug: "grocer",
  title: "Grocer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
