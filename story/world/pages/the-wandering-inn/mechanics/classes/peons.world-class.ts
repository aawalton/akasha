import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peons = {
  id: "01a0657e-13b7-75eb-b33b-967031affbbd",
  type: "page-type/world-class",
  slug: "peons",
  title: "Peons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
