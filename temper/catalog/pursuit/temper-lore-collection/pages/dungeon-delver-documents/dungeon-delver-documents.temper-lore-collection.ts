import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dungeonDelverDocuments = {
  id: "01a0d60d-708e-7000-ae63-f03c0c646c80",
  type: "page-type/temper-lore-collection",
  slug: "dungeon-delver-documents",
  title: "Dungeon Delver Documents",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 51,
  esoLoreCollectionId: 222,
  loreCollectionDescription:
    "Tomes, journals, books, letters, and scrolls related to the vast dungeons that pepper the lands of Tamriel and beyond.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_dungeons.dds",
  hidden: false,
  bookTotal: 47,
} as const satisfies TemperLoreCollection
