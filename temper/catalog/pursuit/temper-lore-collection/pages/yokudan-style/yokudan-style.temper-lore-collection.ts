import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const yokudanStyle = {
  id: "01a0d5e7-2613-7c1e-9bec-c26392df02b1",
  type: "page-type/temper-lore-collection",
  slug: "yokudan-style",
  title: "Yokudan Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 5,
  esoLoreCollectionId: 78,
  loreCollectionDescription: "These books enable crafting in the Yokudan style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
