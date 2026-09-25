import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const solitudeSoliloquies = {
  id: "01a0d60b-8109-7687-8470-4234a24ac8dc",
  type: "page-type/temper-lore-collection",
  slug: "solitude-soliloquies",
  title: "Solitude Soliloquies",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 39,
  esoLoreCollectionId: 158,
  loreCollectionDescription: "Writings related to the holds and environs of Western Skyrim.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 118,
} as const satisfies TemperLoreCollection
