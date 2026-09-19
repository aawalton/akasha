import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rangers = {
  id: "01a06586-0a1d-7486-8c22-e0ac8e3c9d3d",
  type: "page-type/world-class",
  slug: "rangers",
  title: "Rangers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
