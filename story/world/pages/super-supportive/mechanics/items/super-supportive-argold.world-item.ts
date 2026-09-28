import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveArgold = {
  id: "01a0e9f3-f5f6-7c83-ac49-cf9f040a1268",
  type: "page-type/world-item",
  slug: "super-supportive-argold",
  title: "Argold",
  world: "world/super-supportive",
  aliases: ["argold"],
  description: "The System's currency, held in an account.",
} as const satisfies WorldItem
