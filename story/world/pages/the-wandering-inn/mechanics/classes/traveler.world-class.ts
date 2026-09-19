import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traveler = {
  id: "01a0657e-026d-75ee-8c85-618d019982fa",
  type: "page-type/world-class",
  slug: "traveler",
  title: "Traveler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
