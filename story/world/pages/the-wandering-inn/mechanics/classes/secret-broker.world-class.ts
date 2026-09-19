import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const secretBroker = {
  id: "01a0657e-024b-7482-bb46-889cb2390f39",
  type: "page-type/world-class",
  slug: "secret-broker",
  title: "Secret Broker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
