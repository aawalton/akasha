import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wardmaster = {
  id: "01a06586-0a72-71f2-bcfb-4cd3cc11d6fd",
  type: "page-type/world-class",
  slug: "wardmaster",
  title: "Wardmaster",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
