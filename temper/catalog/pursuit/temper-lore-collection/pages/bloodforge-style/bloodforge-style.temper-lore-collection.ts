import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const bloodforgeStyle = {
  id: "01a0d5e9-d6df-7f3b-9dce-0959f2678025",
  type: "page-type/temper-lore-collection",
  slug: "bloodforge-style",
  title: "Bloodforge Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 40,
  esoLoreCollectionId: 125,
  loreCollectionDescription: "These book fragments enable crafting in the Bloodforge style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
