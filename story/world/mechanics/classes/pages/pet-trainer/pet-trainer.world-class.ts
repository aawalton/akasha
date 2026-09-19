import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const petTrainer = {
  id: "01a06586-0a06-7687-abb7-68bc59262e39",
  type: "page-type/world-class",
  slug: "pet-trainer",
  title: "Pet Trainer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
