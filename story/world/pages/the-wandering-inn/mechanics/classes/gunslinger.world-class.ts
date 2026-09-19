import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gunslinger = {
  id: "01a0657e-01ed-7803-ab73-6bdfab2effcf",
  type: "page-type/world-class",
  slug: "gunslinger",
  title: "Gunslinger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
