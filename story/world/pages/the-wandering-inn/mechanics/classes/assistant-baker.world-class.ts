import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const assistantBaker = {
  id: "01a0657e-01ae-7bf6-9567-43ddf9926fc7",
  type: "page-type/world-class",
  slug: "assistant-baker",
  title: "Assistant Baker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
