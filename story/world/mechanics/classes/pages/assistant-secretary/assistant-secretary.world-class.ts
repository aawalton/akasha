import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const assistantSecretary = {
  id: "01a0657e-1336-7941-be6b-4bfe6c286701",
  type: "page-type/world-class",
  slug: "assistant-secretary",
  title: "Assistant Secretary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
