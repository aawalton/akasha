import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const libraryOfIncunabula = {
  id: "01a0d5f8-02f9-7ac7-93dd-1a9d685c8ab1",
  type: "page-type/temper-lore-collection",
  slug: "library-of-incunabula",
  title: "Library of Incunabula",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 32,
  esoLoreCollectionId: 104,
  loreCollectionDescription:
    "Various and sundry tomes, journals, books, letters, and scrolls gathered by scholars and archivists across all the realms of Tamriel.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_dungeons.dds",
  hidden: false,
  bookTotal: 123,
  createdAt: "2026-09-25T00:29:55.833Z",
  updatedAt: "2026-09-25T00:29:58.000Z",
} as const satisfies TemperLoreCollection
