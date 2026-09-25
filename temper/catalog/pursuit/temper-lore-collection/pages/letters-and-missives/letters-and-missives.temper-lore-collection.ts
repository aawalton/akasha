import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const lettersAndMissives = {
  id: "01a0d5f3-0ef9-7667-acce-7b413e1c7e3b",
  type: "page-type/temper-lore-collection",
  slug: "letters-and-missives",
  title: "Letters and Missives",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 8,
  esoLoreCollectionId: 51,
  loreCollectionDescription: "A collection of relatively formal letters.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 126,
} as const satisfies TemperLoreCollection
