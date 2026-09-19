import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const supporter = {
  id: "01a0657e-0262-7f71-a295-6fab53234f48",
  type: "page-type/world-class",
  slug: "supporter",
  title: "Supporter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
