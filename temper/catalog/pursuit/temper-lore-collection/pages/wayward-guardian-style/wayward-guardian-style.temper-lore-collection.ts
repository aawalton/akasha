import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const waywardGuardianStyle = {
  id: "01a0d5ed-aaf5-737f-83e7-5693993648ff",
  type: "page-type/temper-lore-collection",
  slug: "wayward-guardian-style",
  title: "Wayward Guardian Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 82,
  esoLoreCollectionId: 179,
  loreCollectionDescription: "These book fragments enable crafting in the Wayward Guardian style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
