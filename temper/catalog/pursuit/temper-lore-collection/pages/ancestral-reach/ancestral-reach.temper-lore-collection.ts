import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralReach = {
  id: "01a0d5ed-711f-7ac2-9c17-34932ac4fd3e",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-reach",
  title: "Ancestral Reach",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 79,
  esoLoreCollectionId: 176,
  loreCollectionDescription: "These book fragments enable crafting in the Ancestral Reach style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
