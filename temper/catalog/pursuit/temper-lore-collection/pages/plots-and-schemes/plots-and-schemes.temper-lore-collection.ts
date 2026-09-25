import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const plotsAndSchemes = {
  id: "01a0d5f4-c389-7b09-8f1c-9fdd6d84f034",
  type: "page-type/temper-lore-collection",
  slug: "plots-and-schemes",
  title: "Plots and Schemes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 14,
  esoLoreCollectionId: 57,
  loreCollectionDescription:
    "Political machinations, rebellions, mass poisonings, plots to bring ancient evil back into the world, etc.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 89,
} as const satisfies TemperLoreCollection
