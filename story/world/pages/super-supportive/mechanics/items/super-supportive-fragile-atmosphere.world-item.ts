import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveFragileAtmosphere = {
  id: "01a0e9f4-be67-7767-96b1-b14402343a61",
  type: "page-type/world-item",
  slug: "super-supportive-fragile-atmosphere",
  title: "The Fragile Atmosphere",
  world: "world/super-supportive",
  description: "A single-use tool that gives a few minutes of Earth air, gravity and pressure.",
} as const satisfies WorldItem
