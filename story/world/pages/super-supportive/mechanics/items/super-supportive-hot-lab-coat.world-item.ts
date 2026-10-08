import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveHotLabCoat = {
  id: "01a0e9f3-f5f6-7712-87ea-91a7291e2794",
  type: "page-type/world-item",
  slug: "super-supportive-hot-lab-coat",
  title: "Hot Lab Coat",
  world: "world/super-supportive",
  aliases: ["lab coat"],
  description:
    "A long shiny red Wardrobe coat with goggles that gives Dexterity, Agility and Blast Resistance.",
  createdAt: "2026-09-28T21:37:54.678Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldItem
