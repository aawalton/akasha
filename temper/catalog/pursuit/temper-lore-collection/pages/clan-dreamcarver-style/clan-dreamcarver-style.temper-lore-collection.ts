import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const clanDreamcarverStyle = {
  id: "01a0d5f0-048f-73b5-8ead-f20565530a56",
  type: "page-type/temper-lore-collection",
  slug: "clan-dreamcarver-style",
  title: "Clan Dreamcarver Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 105,
  esoLoreCollectionId: 212,
  loreCollectionDescription: "These book fragments enable crafting in the Clan Dreamcarver style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
