import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const archipelagoBooksAndAlmanacs = {
  id: "01a0d60c-baf2-75e6-b226-6d82e3534f85",
  type: "page-type/temper-lore-collection",
  slug: "archipelago-books-and-almanacs",
  title: "Archipelago Books and Almanacs",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 47,
  esoLoreCollectionId: 206,
  loreCollectionDescription:
    "Books, notes, and other writings available on Galen and Y'ffelon in the Systres Archipelago.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 76,
} as const satisfies TemperLoreCollection
