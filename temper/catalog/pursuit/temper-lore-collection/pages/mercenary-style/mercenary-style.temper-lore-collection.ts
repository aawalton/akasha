import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const mercenaryStyle = {
  id: "01a0d5e7-4c91-75e4-b852-0f7e56ada950",
  type: "page-type/temper-lore-collection",
  slug: "mercenary-style",
  title: "Mercenary Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 7,
  esoLoreCollectionId: 80,
  loreCollectionDescription:
    "This style enables the crafter to create items in the martial and utilitarian Mercenary style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
