import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTenRingSet = {
  id: "01a0e9fc-0701-7444-afde-df8257c4a7d7",
  type: "page-type/world-item",
  slug: "super-supportive-ten-ring-set",
  title: "Ten-ring set",
  world: "world/super-supportive",
  aliases: ["armor rings", "ten-ring hand protection"],
  description: "A set of ten enchanted rings that armor a hand caster's hands and lower arms.",
} as const satisfies WorldItem
