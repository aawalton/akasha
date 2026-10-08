import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMbf = {
  id: "01a0e9f8-6bb3-75f0-8582-c0b0ee67cb0e",
  type: "page-type/world-item",
  slug: "super-supportive-mbf",
  title: "MBF",
  world: "world/super-supportive",
  aliases: ["my friend", "The All-seeker"],
  description: "A Wrightwork entity that stores versions of people and makes predictions.",
  createdAt: "2026-09-28T21:42:46.963Z",
  updatedAt: "2026-09-28T21:42:50.000Z",
} as const satisfies WorldItem
