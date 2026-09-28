import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveEnchantedExternalHeart = {
  id: "01a0e9fc-be82-7bab-9c68-f9cf3d93262d",
  type: "page-type/world-item",
  slug: "super-supportive-enchanted-external-heart",
  title: "Enchanted external heart",
  world: "world/super-supportive",
  description:
    "A clear red jellyfish-like blob meant to be slapped onto the chest of someone whose heart has stopped.",
} as const satisfies WorldItem
