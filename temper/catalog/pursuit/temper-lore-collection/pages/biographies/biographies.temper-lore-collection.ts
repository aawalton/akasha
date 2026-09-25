import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const biographies = {
  id: "01a06343-f9fa-7051-b097-89f67fd7e88f",
  type: "page-type/temper-lore-collection",
  slug: "biographies",
  title: "Biographies",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 9,
  esoLoreCollectionId: 13,
  loreCollectionDescription: "A Mages Guild collection of books about the lives of the great.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
