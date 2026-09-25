import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const yffresWillStyle = {
  id: "01a0d5ef-8bf6-734e-852a-d3a60b4bd16c",
  type: "page-type/temper-lore-collection",
  slug: "yffres-will-style",
  title: "Y'ffre's Will Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 99,
  esoLoreCollectionId: 201,
  loreCollectionDescription: "These book fragments enable crafting in the Y'ffre's Will style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
