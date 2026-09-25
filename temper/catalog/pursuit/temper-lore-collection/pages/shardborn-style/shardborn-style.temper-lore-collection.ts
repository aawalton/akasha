import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const shardbornStyle = {
  id: "01a0d5f0-6a92-7c74-93e8-fae9a9ec8fec",
  type: "page-type/temper-lore-collection",
  slug: "shardborn-style",
  title: "Shardborn Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 110,
  esoLoreCollectionId: 218,
  loreCollectionDescription: "These book fragments enable crafting in the Shardborn style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
