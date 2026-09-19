import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const server = {
  id: "01a0657e-024d-75bd-8625-3f51b9f48cec",
  type: "page-type/world-class",
  slug: "server",
  title: "Server",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
