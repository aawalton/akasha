import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTimeglass = {
  id: "01a0e9f8-6bb4-76f2-99a8-1989ceeee801",
  type: "page-type/world-item",
  slug: "super-supportive-timeglass",
  title: "timeglass",
  world: "world/super-supportive",
  aliases: ["fifteen-year timer"],
  description: "A horizontal hourglass that drops one grain of sand a minute for fifteen years.",
} as const satisfies WorldItem
