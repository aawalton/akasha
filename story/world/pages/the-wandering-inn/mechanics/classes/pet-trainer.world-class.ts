import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const petTrainer = {
  id: "01a06586-0a06-7687-abb7-68bc59262e39",
  type: "page-type/world-class",
  slug: "pet-trainer",
  title: "Pet Trainer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.342Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
