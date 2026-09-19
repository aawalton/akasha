import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const informationBroker = {
  id: "01a0657e-1376-795d-8ffa-95df3c93bf09",
  type: "page-type/world-class",
  slug: "information-broker",
  title: "Information Broker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
