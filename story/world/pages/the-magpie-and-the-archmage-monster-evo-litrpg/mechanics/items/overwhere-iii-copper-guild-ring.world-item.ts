import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIiiCopperGuildRing = {
  id: "01a0f1fb-89e9-7a18-a1ab-58ad0092499f",
  type: "page-type/world-item",
  slug: "overwhere-iii-copper-guild-ring",
  title: "Copper Guild Ring",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A plain copper band stamped with the Guild's mark that resizes to its wearer. It shows the wearer's quests in System windows.",
} as const satisfies WorldItem
