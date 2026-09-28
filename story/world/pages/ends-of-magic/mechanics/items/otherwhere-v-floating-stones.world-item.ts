import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVFloatingStones = {
  id: "01a0ea04-e182-70b9-a46f-32e2d07ec75f",
  type: "page-type/world-item",
  slug: "otherwhere-v-floating-stones",
  title: "Floating Stones",
  world: "world/ends-of-magic",
  aliases: ["floating rocks", "driftboat anchors"],
  description: "Rocks of Ostren that float in the air.",
} as const satisfies WorldItem
