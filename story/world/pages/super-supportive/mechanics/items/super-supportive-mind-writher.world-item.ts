import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMindWrither = {
  id: "01a0e9f4-be68-7329-b34d-e708fbfe3d88",
  type: "page-type/world-item",
  slug: "super-supportive-mind-writher",
  title: "Mind Writher",
  world: "world/super-supportive",
  aliases: ["Writher"],
  description: "An alien, mind-directed chain whip that glows, cuts, wraps and stabs.",
} as const satisfies WorldItem
