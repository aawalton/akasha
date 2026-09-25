import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const pellitineStyle = {
  id: "01a0d5eb-fbff-776b-9da2-814b60e5d7d0",
  type: "page-type/temper-lore-collection",
  slug: "pellitine-style",
  title: "Pellitine Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 60,
  esoLoreCollectionId: 149,
  loreCollectionDescription: "These book fragments enable crafting in the Pellitine style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
