import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const newMoonPriestStyle = {
  id: "01a0d5ec-5edc-7723-a806-f62ba6524b2f",
  type: "page-type/temper-lore-collection",
  slug: "new-moon-priest-style",
  title: "New Moon Priest Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 65,
  esoLoreCollectionId: 156,
  loreCollectionDescription: "These book fragments enable crafting in the New Moon Priest style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
