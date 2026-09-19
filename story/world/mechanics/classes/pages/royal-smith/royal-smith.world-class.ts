import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalSmith = {
  id: "01a0657e-0249-7596-8678-71e77adbd4e5",
  type: "page-type/world-class",
  slug: "royal-smith",
  title: "Royal Smith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
