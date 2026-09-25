import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const darkBrotherhoodStyle = {
  id: "01a0d5e8-ed5f-74b4-a3ac-fcdd5e76a4c5",
  type: "page-type/temper-lore-collection",
  slug: "dark-brotherhood-style",
  title: "Dark Brotherhood Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 28,
  esoLoreCollectionId: 110,
  loreCollectionDescription: "These book fragments enable crafting in the Dark Brotherhood style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
