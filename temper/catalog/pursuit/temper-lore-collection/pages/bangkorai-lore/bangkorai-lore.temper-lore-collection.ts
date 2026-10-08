import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const bangkoraiLore = {
  id: "01a06343-f9fa-7020-bdd2-bca0ec04e784",
  type: "page-type/temper-lore-collection",
  slug: "bangkorai-lore",
  title: "Bangkorai Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 4,
  esoLoreCollectionId: 7,
  loreCollectionDescription: "A Mages Guild collection of lore books about Bangkorai.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  createdAt: "2026-09-02T17:56:34.426Z",
  updatedAt: "2026-09-25T01:28:09.000Z",
} as const satisfies TemperLoreCollection
