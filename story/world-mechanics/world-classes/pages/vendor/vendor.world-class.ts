import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const vendor = {
  id: "01a0657e-026e-7298-aed5-fb7c1627a5a1",
  type: "world-class",
  slug: "vendor",
  title: "Vendor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
