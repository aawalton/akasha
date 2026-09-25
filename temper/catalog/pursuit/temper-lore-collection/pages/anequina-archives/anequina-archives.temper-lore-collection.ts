import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const anequinaArchives = {
  id: "01a0d60b-2344-75ad-beea-c048f85f2ab9",
  type: "page-type/temper-lore-collection",
  slug: "anequina-archives",
  title: "Anequina Archives",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 37,
  esoLoreCollectionId: 142,
  loreCollectionDescription:
    "Lore books, notes, journals, and memoranda associated with the northern region of Elsweyr.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 116,
} as const satisfies TemperLoreCollection
