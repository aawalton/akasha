import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const deshaanLore = {
  id: "01a06343-f9fa-70f8-a7b9-4b9231dce65a",
  type: "page-type/temper-lore-collection",
  slug: "deshaan-lore",
  title: "Deshaan Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 23,
  esoLoreCollectionId: 28,
  loreCollectionDescription: "A Mages Guild collection of books regarding Deshaan.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  createdAt: "2026-09-02T17:56:34.426Z",
  updatedAt: "2026-09-25T01:28:09.000Z",
} as const satisfies TemperLoreCollection
