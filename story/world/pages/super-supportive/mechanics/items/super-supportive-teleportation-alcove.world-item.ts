import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTeleportationAlcove = {
  id: "01a0e9f3-f5f7-7f7b-9da1-a970d35d259b",
  type: "page-type/world-item",
  slug: "super-supportive-teleportation-alcove",
  title: "Teleportation alcove",
  world: "world/super-supportive",
  aliases: ["alcove"],
  description: "A small runed space for sending and receiving teleports.",
  createdAt: "2026-09-28T21:37:54.679Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldItem
