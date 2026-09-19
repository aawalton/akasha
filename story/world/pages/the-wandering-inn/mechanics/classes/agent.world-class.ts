import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const agent = {
  id: "01a0657e-01a5-7034-aed3-99d99a8892e7",
  type: "page-type/world-class",
  slug: "agent",
  title: "Agent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
