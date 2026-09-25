import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const greymoorStyle = {
  id: "01a0d5ec-c12d-7e59-94c8-fd20faf6aca7",
  type: "page-type/temper-lore-collection",
  slug: "greymoor-style",
  title: "Greymoor Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 70,
  esoLoreCollectionId: 164,
  loreCollectionDescription: "These book fragments enable crafting in the Greymoor style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
