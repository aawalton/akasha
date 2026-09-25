import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const blackSoulGem = {
  id: "01a0d5f1-2645-7702-840c-6a17c52db061",
  type: "page-type/temper-lore-collection",
  slug: "black-soul-gem",
  title: "Black Soul Gem",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 119,
  esoLoreCollectionId: 230,
  loreCollectionDescription: "These book fragments enable crafting in the Black Soul Gem style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
