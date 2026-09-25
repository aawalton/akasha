import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const adventurersAlmanac = {
  id: "01a0d5f8-1fb2-7c8a-9440-b888eeb8cf92",
  type: "page-type/temper-lore-collection",
  slug: "adventurers-almanac",
  title: "Adventurer's Almanac",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 33,
  esoLoreCollectionId: 115,
  loreCollectionDescription:
    "Books that describe tasks without end, the kind of quests that adventurers can complete every day.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 3,
} as const satisfies TemperLoreCollection
