import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const companionsCorrespondence = {
  id: "01a0d60d-bbe5-7e4c-9f84-759f33181d8e",
  type: "page-type/temper-lore-collection",
  slug: "companions-correspondence",
  title: "Companions Correspondence",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 53,
  esoLoreCollectionId: 226,
  loreCollectionDescription:
    "Notes, letters, and other written texts related to companions you meet throughout Tamriel and beyond.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 39,
} as const satisfies TemperLoreCollection
