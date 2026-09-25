import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const divinesAndDeities = {
  id: "01a06343-f9fa-705c-a6d7-05d69b0b6282",
  type: "page-type/temper-lore-collection",
  slug: "divines-and-deities",
  title: "Divines and Deities",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 10,
  esoLoreCollectionId: 14,
  loreCollectionDescription:
    "A Mages Guild collection of books regarding the Divines and other Deities.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_divine.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
