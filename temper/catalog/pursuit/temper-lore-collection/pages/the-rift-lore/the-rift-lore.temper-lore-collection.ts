import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theRiftLore = {
  id: "01a06343-f9fa-7103-9bb8-8e970ee0e26f",
  type: "page-type/temper-lore-collection",
  slug: "the-rift-lore",
  title: "The Rift Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 24,
  esoLoreCollectionId: 29,
  loreCollectionDescription: "A Mages Guild collection of books regarding the Rift.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
