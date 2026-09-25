import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dungeonLore = {
  id: "01a06343-f9fa-7067-b9d1-382e1bd8dfb1",
  type: "page-type/temper-lore-collection",
  slug: "dungeon-lore",
  title: "Dungeon Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 11,
  esoLoreCollectionId: 15,
  loreCollectionDescription: "A Mages Guild collection of books regarding dungeon lore.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_dungeons.dds",
  hidden: false,
  bookTotal: 17,
} as const satisfies TemperLoreCollection
