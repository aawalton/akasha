import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const firstDruidOfTheWorld = {
  id: "01a0655a-7b7c-706d-a30a-bcb0fabcfb1a",
  type: "page-type/world-title",
  slug: "first-druid-of-the-world",
  title: "First Druid of the World",
  world: "world/the-wandering-inn",
} as const satisfies WorldTitle
