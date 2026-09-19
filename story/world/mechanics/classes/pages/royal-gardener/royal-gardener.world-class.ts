import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalGardener = {
  id: "01a06586-0a26-7e07-bafe-d74dcfada40a",
  type: "page-type/world-class",
  slug: "royal-gardener",
  title: "Royal Gardener",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
