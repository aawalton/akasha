import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTeleportationAlcove = {
  id: "01a0e9f3-f5f7-7f7b-9da1-a970d35d259b",
  type: "page-type/world-item",
  slug: "super-supportive-teleportation-alcove",
  title: "Teleportation alcove",
  world: "world/super-supportive",
  aliases: ["alcove"],
  description: "A small runed space for sending and receiving teleports.",
} as const satisfies WorldItem
