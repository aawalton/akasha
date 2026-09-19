import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barbers = {
  id: "01a0657e-01b0-7901-8d33-8568ec462134",
  type: "page-type/world-class",
  slug: "barbers",
  title: "Barbers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
