import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const launderer = {
  id: "01a0657e-138d-7112-805f-12e0d5aa47b6",
  type: "page-type/world-class",
  slug: "launderer",
  title: "Launderer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
