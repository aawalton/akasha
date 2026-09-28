import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveFamilyStone = {
  id: "01a0e9fa-4781-73d9-b5dd-cde825c95ae9",
  type: "page-type/world-item",
  slug: "super-supportive-family-stone",
  title: "Family stone",
  world: "world/super-supportive",
  aliases: ["hearthstone"],
  description: "A household's own stone, set at the base of the hearth.",
} as const satisfies WorldItem
