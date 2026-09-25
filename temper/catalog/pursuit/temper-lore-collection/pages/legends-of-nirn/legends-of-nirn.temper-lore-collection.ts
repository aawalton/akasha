import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const legendsOfNirn = {
  id: "01a06343-f9fa-708a-b0d2-238c09c23aa0",
  type: "page-type/temper-lore-collection",
  slug: "legends-of-nirn",
  title: "Legends of Nirn",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 13,
  esoLoreCollectionId: 17,
  loreCollectionDescription: "A Mages Guild collection of books regarding ancient legends.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
