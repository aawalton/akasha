import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const worldlyTraveler = {
  id: "01a0657e-0272-7ed6-a8ad-90dc8368c4f4",
  type: "page-type/world-class",
  slug: "worldly-traveler",
  title: "Worldly Traveler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
