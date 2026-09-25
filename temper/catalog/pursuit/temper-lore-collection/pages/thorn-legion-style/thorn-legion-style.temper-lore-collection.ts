import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const thornLegionStyle = {
  id: "01a0d5ed-23b2-79c4-9130-46d2a2bec140",
  type: "page-type/temper-lore-collection",
  slug: "thorn-legion-style",
  title: "Thorn Legion Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 75,
  esoLoreCollectionId: 171,
  loreCollectionDescription: "These book fragments enable crafting in the Thorn Legion style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
