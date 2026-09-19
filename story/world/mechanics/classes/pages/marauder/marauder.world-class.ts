import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const marauder = {
  id: "01a0657e-022c-7a2c-aadf-bd0054e6fdf3",
  type: "page-type/world-class",
  slug: "marauder",
  title: "Marauder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
