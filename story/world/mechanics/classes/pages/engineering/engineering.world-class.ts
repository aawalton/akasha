import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const engineering = {
  id: "01a0657e-01d9-739e-a114-54719c03be82",
  type: "page-type/world-class",
  slug: "engineering",
  title: "Engineering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
