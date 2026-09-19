import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fastGrowers = {
  id: "01a0657e-1363-75b0-892e-2f8391b3740b",
  type: "page-type/world-class",
  slug: "fast-growers",
  title: "Fast Growers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
