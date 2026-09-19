import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const headReceptionist = {
  id: "01a0657e-01ef-7cdc-becb-3b72355c1067",
  type: "page-type/world-class",
  slug: "head-receptionist",
  title: "Head Receptionist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
