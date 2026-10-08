import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveOppositeStone = {
  id: "01a0e9f9-1fa1-7660-9916-566d1b7a574a",
  type: "page-type/world-item",
  slug: "super-supportive-opposite-stone",
  title: "Opposite stone",
  world: "world/super-supportive",
  aliases: ["blinky checker", "crystal checker"],
  description:
    "A flat, cloudy, checker-sized crystal that glows when its holder's Opposite does a wordchain.",
  createdAt: "2026-09-28T21:43:33.025Z",
  updatedAt: "2026-09-28T21:43:36.000Z",
} as const satisfies WorldItem
