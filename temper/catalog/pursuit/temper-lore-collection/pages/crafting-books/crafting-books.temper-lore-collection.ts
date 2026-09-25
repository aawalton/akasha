import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const craftingBooks = {
  id: "01a0d5e6-c6d4-71d0-ab36-d6f1df3bba27",
  type: "page-type/temper-lore-collection",
  slug: "crafting-books",
  title: "Crafting Books",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 1,
  esoLoreCollectionId: 43,
  loreCollectionDescription: "Lore books related to the various disciplines of crafting.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 24,
} as const satisfies TemperLoreCollection
