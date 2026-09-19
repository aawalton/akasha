import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cityFolk = {
  id: "01a0657e-134a-726e-9f79-2451dfaab4b3",
  type: "page-type/world-class",
  slug: "city-folk",
  title: "City Folk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
