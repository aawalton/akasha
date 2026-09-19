import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const toymakers = {
  id: "01a06586-0a69-7f73-ba94-075b8ff20bde",
  type: "page-type/world-class",
  slug: "toymakers",
  title: "Toymakers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
