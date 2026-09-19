import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artilleryExperts = {
  id: "01a0657e-01ab-744e-8df3-b2fce1909683",
  type: "page-type/world-class",
  slug: "artillery-experts",
  title: "Artillery Experts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
