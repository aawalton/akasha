import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const imperialLibrary = {
  id: "01a0d5f6-f385-7acd-9c9a-318c376a64c4",
  type: "page-type/temper-lore-collection",
  slug: "imperial-library",
  title: "Imperial Library",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 26,
  esoLoreCollectionId: 69,
  loreCollectionDescription: "Tomes and correspondence from the Imperial City.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 20,
} as const satisfies TemperLoreCollection
