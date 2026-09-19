import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const host = {
  id: "01a0657e-01f9-7b05-be4b-21c984e249af",
  type: "page-type/world-class",
  slug: "host",
  title: "Host",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
