import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const giftedSwaddlingBlanket = {
  id: "01a17edd-ccb4-7b82-abb0-3d4a10081eec",
  type: "page-type/world-item",
  slug: "gifted-swaddling-blanket",
  title: "Swaddling Blanket",
  world: "world/gifted",
  description: "A blanket wrapped tight around a newborn.",
  category: "armor",
  createdAt: "2026-10-27T19:37:07.507Z",
  updatedAt: "2026-10-27T19:37:07.507Z",
} as const satisfies WorldItem
