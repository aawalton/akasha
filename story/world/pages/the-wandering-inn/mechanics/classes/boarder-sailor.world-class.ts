import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const boarderSailor = {
  id: "01a0657e-133f-7e5e-aed0-7fddc1a72fae",
  type: "page-type/world-class",
  slug: "boarder-sailor",
  title: "Boarder Sailor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
