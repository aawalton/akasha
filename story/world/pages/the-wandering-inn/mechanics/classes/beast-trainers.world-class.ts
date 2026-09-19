import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const beastTrainers = {
  id: "01a0657e-133d-7ed4-8a8b-fe867b81959e",
  type: "page-type/world-class",
  slug: "beast-trainers",
  title: "Beast Trainers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
