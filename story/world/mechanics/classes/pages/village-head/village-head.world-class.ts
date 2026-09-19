import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const villageHead = {
  id: "01a0657e-026f-71da-a2e9-0d96b91c69d9",
  type: "page-type/world-class",
  slug: "village-head",
  title: "Village Head",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
