import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const craftswomen = {
  id: "01a0657e-01cc-7ccb-a1d8-08dad023b74b",
  type: "page-type/world-class",
  slug: "craftswomen",
  title: "Craftswomen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
