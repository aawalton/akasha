import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const paragon = {
  id: "01a0657e-0236-737a-bda0-7fa57acf511b",
  type: "page-type/world-class",
  slug: "paragon",
  title: "Paragon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
