import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const merchant = {
  id: "01a0657e-13a2-7c0b-b868-80f3f9eb18c1",
  type: "world-class",
  slug: "merchant",
  title: "Merchant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
