import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const sunspireStyle = {
  id: "01a0d5ec-104a-74e3-89ca-883102438723",
  type: "page-type/temper-lore-collection",
  slug: "sunspire-style",
  title: "Sunspire Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 61,
  esoLoreCollectionId: 150,
  loreCollectionDescription: "These book fragments enable crafting in the Sunspire style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
