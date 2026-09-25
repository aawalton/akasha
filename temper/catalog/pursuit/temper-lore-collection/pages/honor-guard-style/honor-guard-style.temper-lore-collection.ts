import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const honorGuardStyle = {
  id: "01a0d5eb-85b3-7480-b74e-ff8a547d1642",
  type: "page-type/temper-lore-collection",
  slug: "honor-guard-style",
  title: "Honor Guard Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 54,
  esoLoreCollectionId: 143,
  loreCollectionDescription: "These book fragments enable crafting in the Honor Guard style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
