import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theDevotedAndTheDeranged = {
  id: "01a0d5f5-abbb-7b13-90fb-fc8251ad1dbc",
  type: "page-type/temper-lore-collection",
  slug: "the-devoted-and-the-deranged",
  title: "The Devoted and the Deranged",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 18,
  esoLoreCollectionId: 61,
  loreCollectionDescription:
    "Tracts, notes, books, and journals by and about those who are strong in their faith and/or their delusions.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 102,
} as const satisfies TemperLoreCollection
