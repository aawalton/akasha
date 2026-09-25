import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const elderArgonianStyle = {
  id: "01a0d5eb-ad58-75e7-a735-5acec7afe64e",
  type: "page-type/temper-lore-collection",
  slug: "elder-argonian-style",
  title: "Elder Argonian Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 56,
  esoLoreCollectionId: 145,
  loreCollectionDescription: "These book fragments enable crafting in the Elder Argonian style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
