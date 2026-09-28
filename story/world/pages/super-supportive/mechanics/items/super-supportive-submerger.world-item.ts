import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSubmerger = {
  id: "01a0e9f8-6bb4-7c40-9fba-708b1953ab2d",
  type: "page-type/world-item",
  slug: "super-supportive-submerger",
  title: "Submerger",
  world: "world/super-supportive",
  aliases: ["Sinker Sender"],
  description:
    "An aquarium-like device of yellow oil and water with a silver bead, which sinks a boat deep and hides it.",
} as const satisfies WorldItem
