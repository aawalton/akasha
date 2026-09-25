import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const shadowfenLore = {
  id: "01a06343-f9fa-7036-a892-140907340882",
  type: "page-type/temper-lore-collection",
  slug: "shadowfen-lore",
  title: "Shadowfen Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 6,
  esoLoreCollectionId: 9,
  loreCollectionDescription: "A Mages Guild collection of lore books about Shadowfen.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
