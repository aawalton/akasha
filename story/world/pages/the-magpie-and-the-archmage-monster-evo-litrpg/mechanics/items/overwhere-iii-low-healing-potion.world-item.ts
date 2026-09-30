import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIiiLowHealingPotion = {
  id: "01a0f35d-ec8b-7428-a961-0e664bc65f6c",
  type: "page-type/world-item",
  slug: "overwhere-iii-low-healing-potion",
  title: "Low Healing Potion",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A stoppered clay flask of cloudy green herb-brew that eases pain and gives back about 10 health.",
} as const satisfies WorldItem
