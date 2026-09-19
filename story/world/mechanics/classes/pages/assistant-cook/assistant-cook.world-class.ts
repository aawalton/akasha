import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const assistantCook = {
  id: "01a0657e-1336-7dd7-8e7a-9a9d75bd3c58",
  type: "page-type/world-class",
  slug: "assistant-cook",
  title: "Assistant Cook",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
