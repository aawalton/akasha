import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const headmaster = {
  id: "01a0657e-01f4-7537-b11b-f4a6396b985d",
  type: "page-type/world-class",
  slug: "headmaster",
  title: "Headmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
