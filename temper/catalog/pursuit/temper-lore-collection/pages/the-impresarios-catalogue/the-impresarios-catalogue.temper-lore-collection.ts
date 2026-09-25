import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theImpresariosCatalogue = {
  id: "01a0d60c-18bd-7c18-b720-fafc55c23c4b",
  type: "page-type/temper-lore-collection",
  slug: "the-impresarios-catalogue",
  title: "The Impresario's Catalogue",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 43,
  esoLoreCollectionId: 188,
  loreCollectionDescription:
    "Tomes, letters, and other missives relating to festivals, celebrations, contests, prologues, and other events happening throughout Tamriel.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 18,
} as const satisfies TemperLoreCollection
