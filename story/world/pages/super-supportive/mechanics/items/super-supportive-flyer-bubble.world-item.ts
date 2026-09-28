import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveFlyerBubble = {
  id: "01a0e9fc-be82-72af-8538-47903dd0650f",
  type: "page-type/world-item",
  slug: "super-supportive-flyer-bubble",
  title: "Flyer bubble",
  world: "world/super-supportive",
  description: "An airy bubble vehicle with a bench and a clear dome that can show images.",
} as const satisfies WorldItem
