import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const stormhavenLore = {
  id: "01a06343-f9fa-700a-9a28-10e210aff1a2",
  type: "page-type/temper-lore-collection",
  slug: "stormhaven-lore",
  title: "Stormhaven Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 2,
  esoLoreCollectionId: 5,
  loreCollectionDescription: "A Mages Guild collection of lore books about Stormhaven.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
} as const satisfies TemperLoreCollection
