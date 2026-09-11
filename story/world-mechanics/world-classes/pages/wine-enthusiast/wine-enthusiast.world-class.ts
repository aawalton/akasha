import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const wineEnthusiast = {
  id: "01a06586-0a76-75f7-b76f-1f37d7de0f82",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "wine-enthusiast",
  title: "Wine Enthusiast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
