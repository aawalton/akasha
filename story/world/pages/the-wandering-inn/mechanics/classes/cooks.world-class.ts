import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cooks = {
  id: "01a0657e-134f-71d0-a206-de0743e5be49",
  type: "page-type/world-class",
  slug: "cooks",
  title: "Cooks",
  world: "world/the-wandering-inn",
  appearanceCount: 64,
  references: "jsonl",
} as const satisfies WorldClass
