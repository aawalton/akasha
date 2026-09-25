import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const exilesRevengeStyle = {
  id: "01a0d5f0-be52-73e7-ba41-11d749b37aeb",
  type: "page-type/temper-lore-collection",
  slug: "exiles-revenge-style",
  title: "Exile's Revenge Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 114,
  esoLoreCollectionId: 224,
  loreCollectionDescription: "These book fragments enable crafting in the Exile's Revenge style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
