import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSummonarium = {
  id: "01a0e9f3-f5f7-769d-8c83-263ff0b9fbb1",
  type: "page-type/world-item",
  slug: "super-supportive-summonarium",
  title: "Summonarium",
  world: "world/super-supportive",
  description: "A place with a runic floor for summoning and teleporting.",
} as const satisfies WorldItem
