import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const apocryphalPages = {
  id: "01a0d60d-156d-7564-b09b-0ad498866fdf",
  type: "page-type/temper-lore-collection",
  slug: "apocryphal-pages",
  title: "Apocryphal Pages",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 49,
  esoLoreCollectionId: 211,
  loreCollectionDescription:
    "Books of forbidden knowledge, lost secrets, and the mysteries of reality, found throughout the libraries of Hermaeus Mora's Oblivion realm, Apocrypha.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_daedric.dds",
  hidden: false,
  bookTotal: 74,
} as const satisfies TemperLoreCollection
