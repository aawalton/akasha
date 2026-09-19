import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hawkmaster = {
  id: "01a0657e-01ee-7ad5-8d39-ff82c8aa2c68",
  type: "page-type/world-class",
  slug: "hawkmaster",
  title: "Hawkmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
