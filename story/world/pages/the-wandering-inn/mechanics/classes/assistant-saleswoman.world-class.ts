import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const assistantSaleswoman = {
  id: "01a0657e-01ae-786f-932a-34c75f435f11",
  type: "page-type/world-class",
  slug: "assistant-saleswoman",
  title: "Assistant Saleswoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
