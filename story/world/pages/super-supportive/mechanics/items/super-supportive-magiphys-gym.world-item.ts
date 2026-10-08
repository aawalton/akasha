import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMagiphysGym = {
  id: "01a0e9f4-be68-71be-9506-fc1282e6a896",
  type: "page-type/world-item",
  slug: "super-supportive-magiphys-gym",
  title: "MagiPhys Gym",
  world: "world/super-supportive",
  aliases: ["gym floor", "white floor"],
  description: "An unbreakable gym whose floor blocks serious harm when switched on.",
  createdAt: "2026-09-28T21:38:45.992Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
