import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const coldharbourDominatorStyle = {
  id: "01a0d5f0-fcd7-7bc8-a8ea-67bd99b28bc7",
  type: "page-type/temper-lore-collection",
  slug: "coldharbour-dominator-style",
  title: "Coldharbour Dominator Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 117,
  esoLoreCollectionId: 228,
  loreCollectionDescription:
    "These book fragments enable crafting in the Coldharbour Dominator style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
