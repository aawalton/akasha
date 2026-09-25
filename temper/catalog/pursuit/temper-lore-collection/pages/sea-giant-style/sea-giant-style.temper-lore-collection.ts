import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const seaGiantStyle = {
  id: "01a0d5ec-d525-7698-8613-335759d416c3",
  type: "page-type/temper-lore-collection",
  slug: "sea-giant-style",
  title: "Sea Giant Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 71,
  esoLoreCollectionId: 165,
  loreCollectionDescription: "These book fragments enable crafting in the Sea Giant style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
