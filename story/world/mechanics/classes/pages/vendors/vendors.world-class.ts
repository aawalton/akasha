import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const vendors = {
  id: "01a06586-0a6f-7ea8-a3d6-972458f41cdb",
  type: "page-type/world-class",
  slug: "vendors",
  title: "Vendors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
