import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const hazardousAlchemyStyle = {
  id: "01a0d5ed-3753-7195-a972-843d2f64ab1b",
  type: "page-type/temper-lore-collection",
  slug: "hazardous-alchemy-style",
  title: "Hazardous Alchemy Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 76,
  esoLoreCollectionId: 172,
  loreCollectionDescription: "These book fragments enable crafting in the Hazardous Alchemy style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
