import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fools = {
  id: "01a0657e-01dd-7919-8083-9814703c45aa",
  type: "page-type/world-class",
  slug: "fools",
  title: "Fools",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
