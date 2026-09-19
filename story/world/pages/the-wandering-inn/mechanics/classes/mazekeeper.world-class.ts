import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mazekeeper = {
  id: "01a0657e-0230-7ae3-a266-942edb93c4f2",
  type: "page-type/world-class",
  slug: "mazekeeper",
  title: "Mazekeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
