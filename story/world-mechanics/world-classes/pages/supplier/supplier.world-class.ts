import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const supplier = {
  id: "01a06586-0a5f-7dd3-a863-3113351e620c",
  type: "world-class",
  slug: "supplier",
  title: "Supplier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
