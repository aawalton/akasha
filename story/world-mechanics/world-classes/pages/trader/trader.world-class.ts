import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const trader = {
  id: "01a06586-0a69-7ae5-8aa1-0b279ce2630e",
  type: "world-class",
  slug: "trader",
  title: "Trader",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
