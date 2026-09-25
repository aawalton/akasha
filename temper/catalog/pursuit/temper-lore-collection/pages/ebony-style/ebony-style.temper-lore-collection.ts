import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ebonyStyle = {
  id: "01a0d5e8-3b29-779d-9386-c2cbedeb6925",
  type: "page-type/temper-lore-collection",
  slug: "ebony-style",
  title: "Ebony Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 19,
  esoLoreCollectionId: 97,
  loreCollectionDescription: "These book fragments enable crafting in the Ebony style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
