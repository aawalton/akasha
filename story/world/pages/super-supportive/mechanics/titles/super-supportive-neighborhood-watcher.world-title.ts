import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveNeighborhoodWatcher = {
  id: "01a0e9fb-2b67-7cfb-8bef-6c8355f84d1a",
  type: "page-type/world-title",
  slug: "super-supportive-neighborhood-watcher",
  title: "Neighborhood Watcher",
  world: "world/super-supportive",
  aliases: ["Watcher"],
  description: "An Anesidoran job anticipating problems from superhumans in family neighborhoods.",
} as const satisfies WorldTitle
