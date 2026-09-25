import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ashlanderStyle = {
  id: "01a0d5e9-88bb-72b2-ad2e-a402c231b86a",
  type: "page-type/temper-lore-collection",
  slug: "ashlander-style",
  title: "Ashlander Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 36,
  esoLoreCollectionId: 119,
  loreCollectionDescription: "These books enable crafting in the Ashlander style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
