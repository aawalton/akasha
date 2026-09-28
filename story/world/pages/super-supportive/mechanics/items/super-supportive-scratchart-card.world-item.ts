import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveScratchartCard = {
  id: "01a0e9f8-6bb4-7696-898b-13837c0b0967",
  type: "page-type/world-item",
  slug: "super-supportive-scratchart-card",
  title: "scratchart card",
  world: "world/super-supportive",
  aliases: ["scratchpad"],
  description:
    "A paired card of black cardstock; what is scratched on one half appears on the other.",
} as const satisfies WorldItem
