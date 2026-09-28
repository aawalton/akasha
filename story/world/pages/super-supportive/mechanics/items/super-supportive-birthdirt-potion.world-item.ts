import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBirthdirtPotion = {
  id: "01a0e9f8-6bb2-7626-95d1-4416e2155774",
  type: "page-type/world-item",
  slug: "super-supportive-birthdirt-potion",
  title: "birthdirt potion",
  world: "world/super-supportive",
  aliases: ["birth dirt potion", "mud potion"],
  description: "A personal mud potion tied to one's birthplace.",
} as const satisfies WorldItem
