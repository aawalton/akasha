import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveCamouflageMask = {
  id: "01a0e9fc-0700-7e44-b4f2-c0e791179fd5",
  type: "page-type/world-item",
  slug: "super-supportive-camouflage-mask",
  title: "Camouflage mask",
  world: "world/super-supportive",
  aliases: ["Anesidora mask"],
  description:
    "A Wrightwork mask made for one environment that makes its wearer part of that place.",
} as const satisfies WorldItem
