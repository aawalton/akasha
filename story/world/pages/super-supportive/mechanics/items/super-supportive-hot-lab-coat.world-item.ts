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
} as const satisfies WorldItem
