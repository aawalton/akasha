import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theReachReader = {
  id: "01a0d60b-c959-71a1-9cf1-01a59b6267e7",
  type: "page-type/temper-lore-collection",
  slug: "the-reach-reader",
  title: "The Reach Reader",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 41,
  esoLoreCollectionId: 170,
  loreCollectionDescription:
    "Books, letters, and other written material related to the Reach and its people.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 71,
} as const satisfies TemperLoreCollection
