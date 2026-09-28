import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePrivacyRings = {
  id: "01a0e9fc-0701-7fb8-b63c-ad3474909bb5",
  type: "page-type/world-item",
  slug: "super-supportive-privacy-rings",
  title: "Privacy rings",
  world: "world/super-supportive",
  aliases: ["obscuring rings", "private conversation rings"],
  description:
    "A set of very old rough stone rings that keep the wearers' words from reaching other ears.",
} as const satisfies WorldItem
