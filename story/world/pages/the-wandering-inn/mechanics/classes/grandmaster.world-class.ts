import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const grandmaster = {
  id: "01a0657e-01e4-7362-9e05-aff6ec6bf104",
  type: "page-type/world-class",
  slug: "grandmaster",
  title: "Grandmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
