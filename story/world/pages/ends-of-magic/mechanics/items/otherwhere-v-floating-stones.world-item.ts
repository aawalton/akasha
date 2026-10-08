import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVFloatingStones = {
  id: "01a0ea04-e182-70b9-a46f-32e2d07ec75f",
  type: "page-type/world-item",
  slug: "otherwhere-v-floating-stones",
  title: "Floating Stones",
  world: "world/ends-of-magic",
  aliases: ["floating rocks", "driftboat anchors"],
  description: "Rocks that float in the air.",
  createdAt: "2026-09-28T21:56:23.554Z",
  updatedAt: "2026-09-28T22:03:30.000Z",
} as const satisfies WorldItem
