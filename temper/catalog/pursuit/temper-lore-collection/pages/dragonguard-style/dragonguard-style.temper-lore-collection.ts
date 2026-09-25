import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dragonguardStyle = {
  id: "01a0d5ec-23ef-7a00-a51a-aabf6557fa1e",
  type: "page-type/temper-lore-collection",
  slug: "dragonguard-style",
  title: "Dragonguard Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 62,
  esoLoreCollectionId: 153,
  loreCollectionDescription: "These book fragments enable crafting in the Dragonguard style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
