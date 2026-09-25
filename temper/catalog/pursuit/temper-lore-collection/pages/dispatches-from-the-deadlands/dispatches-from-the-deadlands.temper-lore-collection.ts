import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dispatchesFromTheDeadlands = {
  id: "01a0d60c-40c1-73f5-99da-61d9b9f969a6",
  type: "page-type/temper-lore-collection",
  slug: "dispatches-from-the-deadlands",
  title: "Dispatches from the Deadlands",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 44,
  esoLoreCollectionId: 193,
  loreCollectionDescription:
    "Notes, scrolls, letters, and books pertaining to the Oblivion realm of Mehrunes Dagon, the Deadlands, as well as the Celestial Palanquin, Fargrave.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 81,
} as const satisfies TemperLoreCollection
