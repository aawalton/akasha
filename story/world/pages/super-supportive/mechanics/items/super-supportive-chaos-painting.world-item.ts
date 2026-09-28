import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveChaosPainting = {
  id: "01a0e9fc-be82-7198-8dc5-0a823d7e994c",
  type: "page-type/world-item",
  slug: "super-supportive-chaos-painting",
  title: "Chaos painting",
  world: "world/super-supportive",
  aliases: ["angle-dependent painting"],
  description:
    "An Artonan painting visible only from its ideal angle, which can draw the viewer into the scene.",
} as const satisfies WorldItem
