import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const loreOfMurkmire = {
  id: "01a0d5f6-a29b-7d19-90f7-0263e36f20ab",
  type: "page-type/temper-lore-collection",
  slug: "lore-of-murkmire",
  title: "Lore of Murkmire",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 24,
  esoLoreCollectionId: 67,
  loreCollectionDescription: "Tales, legends, and letters from the southern realms of Black Marsh.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 127,
} as const satisfies TemperLoreCollection
