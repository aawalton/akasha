import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const wordsOfThePoets = {
  id: "01a0d5f6-1c17-7a85-b139-3077a192843e",
  type: "page-type/temper-lore-collection",
  slug: "words-of-the-poets",
  title: "Words of the Poets",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 21,
  esoLoreCollectionId: 64,
  loreCollectionDescription: "Books of poetry and song.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 73,
} as const satisfies TemperLoreCollection
