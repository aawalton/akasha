import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bakers = {
  id: "01a0657e-01af-732e-91e8-fea3d8443acb",
  type: "page-type/world-class",
  slug: "bakers",
  title: "Bakers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
