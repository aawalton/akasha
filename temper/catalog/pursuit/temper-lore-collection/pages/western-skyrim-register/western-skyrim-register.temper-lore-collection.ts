import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const westernSkyrimRegister = {
  id: "01a0d60b-a362-7324-8e31-12850b2b4ed5",
  type: "page-type/temper-lore-collection",
  slug: "western-skyrim-register",
  title: "Western Skyrim Register",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 40,
  esoLoreCollectionId: 169,
  loreCollectionDescription: "News and notes from the holds of Western Skyrim.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 42,
} as const satisfies TemperLoreCollection
