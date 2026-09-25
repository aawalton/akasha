import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const loreAndCulture = {
  id: "01a0d5f3-3fdc-778d-88b4-478436136e4b",
  type: "page-type/temper-lore-collection",
  slug: "lore-and-culture",
  title: "Lore and Culture",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 9,
  esoLoreCollectionId: 52,
  loreCollectionDescription: "Books about Tamrielic cultures and social practices.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 111,
} as const satisfies TemperLoreCollection
