import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const literature = {
  id: "01a06343-f9fa-7095-ae72-d6f47e09caeb",
  type: "page-type/temper-lore-collection",
  slug: "literature",
  title: "Literature",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 14,
  esoLoreCollectionId: 18,
  loreCollectionDescription:
    "A Mages Guild collection of books that are significant works of literature.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
