import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const goldCoastTomes = {
  id: "01a0d5f7-73fb-72d9-b35d-28e3e2097cfe",
  type: "page-type/temper-lore-collection",
  slug: "gold-coast-tomes",
  title: "Gold Coast Tomes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 29,
  esoLoreCollectionId: 87,
  loreCollectionDescription:
    "A collection of books found in the western Cyrodiil region of the Gold Coast.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 103,
} as const satisfies TemperLoreCollection
