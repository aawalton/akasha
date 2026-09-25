import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theRecollectionStyle = {
  id: "01a0d5f0-4156-7d8f-bfe3-a59c7b000a0f",
  type: "page-type/temper-lore-collection",
  slug: "the-recollection-style",
  title: "The Recollection Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 108,
  esoLoreCollectionId: 216,
  loreCollectionDescription: "These book fragments enable crafting in The Recollection style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
