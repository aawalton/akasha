import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const alchemy = {
  id: "01a0657e-132c-7dda-bd74-c9d6d32ef312",
  type: "page-type/world-class",
  slug: "alchemy",
  title: "Alchemy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
