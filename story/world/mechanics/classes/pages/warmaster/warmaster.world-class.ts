import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warmaster = {
  id: "01a0657e-0270-7fc3-9fcd-bed0e57bca8b",
  type: "page-type/world-class",
  slug: "warmaster",
  title: "Warmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
