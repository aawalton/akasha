import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const heartsAndFlowers = {
  id: "01a0d5f2-af71-70d1-92fa-635bf32a2aa5",
  type: "page-type/temper-lore-collection",
  slug: "hearts-and-flowers",
  title: "Hearts and Flowers",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 6,
  esoLoreCollectionId: 49,
  loreCollectionDescription: "Letters, notes, and journals about love, romance, and friendship.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 84,
} as const satisfies TemperLoreCollection
