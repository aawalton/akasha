import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const swordTrainee = {
  id: "01a06586-0a61-780e-930d-f97396ef3dc4",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sword-trainee",
  title: "Sword Trainee",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
