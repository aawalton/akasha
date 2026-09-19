import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doubleAgent = {
  id: "01a0657e-1356-73f6-8a30-ef6e56004db6",
  type: "page-type/world-class",
  slug: "double-agent",
  title: "Double Agent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
