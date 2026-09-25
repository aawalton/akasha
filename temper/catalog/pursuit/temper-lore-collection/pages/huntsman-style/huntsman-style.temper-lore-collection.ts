import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const huntsmanStyle = {
  id: "01a0d5eb-4927-73a9-af62-769aed160aee",
  type: "page-type/temper-lore-collection",
  slug: "huntsman-style",
  title: "Huntsman Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 51,
  esoLoreCollectionId: 139,
  loreCollectionDescription: "These book fragments enable crafting in the Huntsman style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
