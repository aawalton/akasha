import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstPrincess = {
  id: "01a0657e-01dc-70ea-abf3-99c353cf8f79",
  type: "page-type/world-class",
  slug: "first-princess",
  title: "First Princess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
