import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const tomesOfTributes = {
  id: "01a0d60c-9395-7a9e-9ee4-7639e6c8c8d8",
  type: "page-type/temper-lore-collection",
  slug: "tomes-of-tributes",
  title: "Tomes of Tributes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 46,
  esoLoreCollectionId: 203,
  loreCollectionDescription:
    "Books, pamphlets, and notices concerning the Tales of Tribute card game.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 30,
} as const satisfies TemperLoreCollection
