import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveForgetfulTravelersBag = {
  id: "01a0e9fc-0700-7a5c-9e0b-e9fa5cb3b40c",
  type: "page-type/world-item",
  slug: "super-supportive-forgetful-travelers-bag",
  title: "Forgetful Traveler's Bag",
  world: "world/super-supportive",
  aliases: ["messenger bag"],
  description: "A satchel more likely to return to its owner than a mundane object would be.",
} as const satisfies WorldItem
