import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const blackFinLegionStyle = {
  id: "01a0d5ee-0e0e-79ba-9d3b-d6d9327b2ce1",
  type: "page-type/temper-lore-collection",
  slug: "black-fin-legion-style",
  title: "Black Fin Legion Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 87,
  esoLoreCollectionId: 185,
  loreCollectionDescription: "These book fragments enable crafting in the Black Fin Legion style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
