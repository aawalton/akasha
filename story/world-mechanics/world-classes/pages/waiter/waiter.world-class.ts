import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const waiter = {
  id: "01a06586-0a71-70b4-85a3-920655ad5351",
  type: "world-class",
  slug: "waiter",
  title: "Waiter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
