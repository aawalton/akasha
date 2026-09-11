import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const taxInspector = {
  id: "01a06586-0a64-7bc0-ab39-1ac32c4c90b0",
  type: "world-class",
  slug: "tax-inspector",
  title: "Tax Inspector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
