import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const worldlyTraveller = {
  id: "01a06586-0a84-702c-aba6-c7d73051ff74",
  type: "page-type/world-class",
  slug: "worldly-traveller",
  title: "Worldly Traveller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
