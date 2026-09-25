import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const mazzatunStyle = {
  id: "01a0d5e9-3b06-76ef-bfde-d2503f1f4fa9",
  type: "page-type/temper-lore-collection",
  slug: "mazzatun-style",
  title: "Mazzatun Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 32,
  esoLoreCollectionId: 114,
  loreCollectionDescription: "These book fragments enable crafting in the Mazzatun style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
