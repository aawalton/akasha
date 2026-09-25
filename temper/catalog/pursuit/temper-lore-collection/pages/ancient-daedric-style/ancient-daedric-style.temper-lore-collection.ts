import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancientDaedricStyle = {
  id: "01a0d5ed-fa22-758d-aa86-49a660bfd2ae",
  type: "page-type/temper-lore-collection",
  slug: "ancient-daedric-style",
  title: "Ancient Daedric Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 86,
  esoLoreCollectionId: 184,
  loreCollectionDescription: "These book fragments enable crafting in the Ancient Daedric style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
