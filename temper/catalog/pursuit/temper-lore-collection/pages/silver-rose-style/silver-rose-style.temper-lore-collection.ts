import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const silverRoseStyle = {
  id: "01a0d5ee-6629-7b20-977e-3c58cdd6c458",
  type: "page-type/temper-lore-collection",
  slug: "silver-rose-style",
  title: "Silver Rose Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 91,
  esoLoreCollectionId: 190,
  loreCollectionDescription: "These book fragments enable crafting in the Silver Rose style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
