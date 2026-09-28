import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveCupOfManySwallows = {
  id: "01a0e9fc-0700-7aeb-99f5-dcece620d30b",
  type: "page-type/world-item",
  slug: "super-supportive-cup-of-many-swallows",
  title: "Cup of Many Swallows",
  world: "world/super-supportive",
  aliases: ["Cup of a Thousand Gulps"],
  description: "A self-refilling cup bonded to its owner by blood.",
} as const satisfies WorldItem
