import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strikeCommander = {
  id: "01a0657e-0261-7e81-9d90-c88e53ce2593",
  type: "page-type/world-class",
  slug: "strike-commander",
  title: "Strike Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
