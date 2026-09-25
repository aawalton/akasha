import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const summersetScrolls = {
  id: "01a0d60a-d5be-7fb2-898c-31998dcf970b",
  type: "page-type/temper-lore-collection",
  slug: "summerset-scrolls",
  title: "Summerset Scrolls",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 35,
  esoLoreCollectionId: 129,
  loreCollectionDescription:
    "Musings, histories, chronicles, anecdotes, and narratives pertaining to Summerset life, culture, and society.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 128,
} as const satisfies TemperLoreCollection
