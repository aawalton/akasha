import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const miller = {
  id: "01a0657e-13a2-7e8f-bc3b-ba58f183e07a",
  type: "page-type/world-class",
  slug: "miller",
  title: "Miller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
