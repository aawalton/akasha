import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const trueSwornStyle = {
  id: "01a0d5ed-d211-75d8-80e7-5fed1e372363",
  type: "page-type/temper-lore-collection",
  slug: "true-sworn-style",
  title: "True-Sworn Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 84,
  esoLoreCollectionId: 182,
  loreCollectionDescription: "These book fragments enable crafting in the True-Sworn style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
