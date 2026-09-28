import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveNyip = {
  id: "01a0e9fc-be82-70e3-9c55-3433126981ea",
  type: "page-type/world-item",
  slug: "super-supportive-nyip",
  title: "Nyip pod",
  world: "world/super-supportive",
  description: "The pod of the wild nyip plant, which bears one every half century.",
} as const satisfies WorldItem
