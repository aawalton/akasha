import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const camelKnights = {
  id: "01a0657e-1342-7ff7-95bc-e3f12e88729c",
  type: "page-type/world-class",
  slug: "camel-knights",
  title: "Camel Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
