import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranRanger = {
  id: "01a0657e-026e-7d94-8121-4ab82f1e2689",
  type: "page-type/world-class",
  slug: "veteran-ranger",
  title: "Veteran Ranger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
