import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const wormCultStyle = {
  id: "01a0d5ea-2627-72cd-b7ac-798d211e0cdc",
  type: "page-type/temper-lore-collection",
  slug: "worm-cult-style",
  title: "Worm Cult Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 44,
  esoLoreCollectionId: 130,
  loreCollectionDescription: "Motif books that enable crafting in the Worm Cult style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
