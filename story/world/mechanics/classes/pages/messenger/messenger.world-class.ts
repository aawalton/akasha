import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const messenger = {
  id: "01a0657e-0232-77cc-b03a-2c1669c7a07b",
  type: "page-type/world-class",
  slug: "messenger",
  title: "Messenger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
