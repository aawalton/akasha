import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hawkers = {
  id: "01a0657e-1370-7a81-8a7b-1983d0f74452",
  type: "page-type/world-class",
  slug: "hawkers",
  title: "Hawkers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
