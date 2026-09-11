import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const headServer = {
  id: "01a0657e-01f3-7547-b834-aa59bea050eb",
  type: "world-class",
  slug: "head-server",
  title: "Head Server",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
