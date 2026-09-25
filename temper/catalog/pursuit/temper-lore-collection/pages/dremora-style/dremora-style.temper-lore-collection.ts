import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dremoraStyle = {
  id: "01a0d5eb-34db-75b8-bf6e-4edf618fb368",
  type: "page-type/temper-lore-collection",
  slug: "dremora-style",
  title: "Dremora Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 50,
  esoLoreCollectionId: 138,
  loreCollectionDescription: "These book fragments enable crafting in the Dremora style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
