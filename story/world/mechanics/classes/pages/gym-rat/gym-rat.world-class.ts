import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gymRat = {
  id: "01a0657e-1370-7f61-8215-3551d435beb7",
  type: "page-type/world-class",
  slug: "gym-rat",
  title: "Gym Rat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
