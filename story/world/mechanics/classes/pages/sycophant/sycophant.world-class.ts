import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sycophant = {
  id: "01a06586-0a62-7370-811a-3dd40bae7dce",
  type: "page-type/world-class",
  slug: "sycophant",
  title: "Sycophant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
