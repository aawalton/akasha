import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const orsiniumArchive = {
  id: "01a0d5f7-160c-7cfc-a9e8-1e60d2601ba0",
  type: "page-type/temper-lore-collection",
  slug: "orsinium-archive",
  title: "Orsinium Archive",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 27,
  esoLoreCollectionId: 85,
  loreCollectionDescription:
    "Books, scrolls, and correspondence relating to the great city of the Orcs and its surrounding region.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 59,
} as const satisfies TemperLoreCollection
