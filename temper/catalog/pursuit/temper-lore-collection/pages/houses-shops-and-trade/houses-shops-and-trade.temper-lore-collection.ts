import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const housesShopsAndTrade = {
  id: "01a0d5f2-db27-709f-8e5a-e4c5b7347363",
  type: "page-type/temper-lore-collection",
  slug: "houses-shops-and-trade",
  title: "Houses, Shops, and Trade",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 7,
  esoLoreCollectionId: 50,
  loreCollectionDescription:
    "Recipes, checklists, bills of sale, contracts, household hints, receipts, ledgers, and so forth.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 87,
} as const satisfies TemperLoreCollection
