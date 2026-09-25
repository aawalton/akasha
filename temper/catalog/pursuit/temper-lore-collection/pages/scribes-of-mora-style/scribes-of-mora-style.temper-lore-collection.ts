import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const scribesOfMoraStyle = {
  id: "01a0d5ef-dc85-7dab-b5aa-5b312f30396a",
  type: "page-type/temper-lore-collection",
  slug: "scribes-of-mora-style",
  title: "Scribes of Mora Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 103,
  esoLoreCollectionId: 208,
  loreCollectionDescription: "These book fragments enable crafting in the Scribes of Mora style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
