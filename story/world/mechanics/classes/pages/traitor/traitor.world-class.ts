import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traitor = {
  id: "01a0657e-026c-70a3-a695-fcbef4fdde39",
  type: "page-type/world-class",
  slug: "traitor",
  title: "Traitor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
