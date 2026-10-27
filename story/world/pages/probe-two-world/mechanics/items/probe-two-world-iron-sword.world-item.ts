import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const probeTwoWorldIronSword = {
  id: "01a17fbf-aff5-7dcd-a284-52beebbd4009",
  type: "page-type/world-item",
  slug: "probe-two-world-iron-sword",
  title: "Iron Sword",
  world: "world/probe-two-world",
  description: "A plain iron sword with a leather grip.",
  category: "weapon",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies WorldItem
