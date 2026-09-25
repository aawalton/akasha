import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const buoyantArmigerStyle = {
  id: "01a0d5e9-7501-74e0-9ee4-04c3d6f6b13d",
  type: "page-type/temper-lore-collection",
  slug: "buoyant-armiger-style",
  title: "Buoyant Armiger Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 35,
  esoLoreCollectionId: 118,
  loreCollectionDescription: "These books enable crafting in the Buoyant Armiger style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
