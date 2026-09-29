import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiOutlanders = {
  id: "01a0ea76-90e7-784a-b9b7-01632b089c46",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-outlanders",
  title: "Outlanders",
  world: "world/the-calamitous-bob-stubbed",
  description: "A person come to Nyil from another world.",
  aliases: ["Travelers", "Otherworlders"],
} as const satisfies WorldMechanic
