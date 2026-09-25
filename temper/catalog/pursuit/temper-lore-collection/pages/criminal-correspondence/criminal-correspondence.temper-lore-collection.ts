import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const criminalCorrespondence = {
  id: "01a0d5f1-f452-79ff-aa3c-5cae630e4a89",
  type: "page-type/temper-lore-collection",
  slug: "criminal-correspondence",
  title: "Criminal Correspondence",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 2,
  esoLoreCollectionId: 45,
  loreCollectionDescription:
    "Books, notes, and ledgers related to crime and criminal organizations.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 98,
} as const satisfies TemperLoreCollection
