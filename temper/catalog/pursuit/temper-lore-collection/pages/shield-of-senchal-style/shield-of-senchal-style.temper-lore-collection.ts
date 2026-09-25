import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const shieldOfSenchalStyle = {
  id: "01a0d5ec-7249-7da2-a78e-ebde46bedc11",
  type: "page-type/temper-lore-collection",
  slug: "shield-of-senchal-style",
  title: "Shield of Senchal Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 66,
  esoLoreCollectionId: 157,
  loreCollectionDescription: "These book fragments enable crafting in the Shield of Senchal style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
