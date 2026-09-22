import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const backlineArcher = {
  id: "01a0657e-01af-7d98-b56f-f0c7e9248f4b",
  type: "page-type/world-class",
  slug: "backline-archer",
  title: "Backline Archer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
