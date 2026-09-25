import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const jewelryCraftingSurveys = {
  id: "01a0d60e-1c0d-7dcf-868a-9874480e354b",
  type: "page-type/temper-lore-collection",
  slug: "jewelry-crafting-surveys",
  title: "Jewelry Crafting Surveys",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 56,
  esoLoreCollectionId: 235,
  loreCollectionDescription:
    "Surveys revealing potential locations for acquiring jewelry crafting materials.",
  gamepadIcon: "/esoui/art/icons/icon_missing.dds",
  hidden: false,
  bookTotal: 25,
} as const satisfies TemperLoreCollection
