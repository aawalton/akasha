import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const reapersMarchLore = {
  id: "01a06343-f9fa-712f-a2e0-8153563abeb9",
  type: "page-type/temper-lore-collection",
  slug: "reapers-march-lore",
  title: "Reaper's March Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 28,
  esoLoreCollectionId: 39,
  loreCollectionDescription: "A Mages Guild collection of books regarding Reaper's March.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
