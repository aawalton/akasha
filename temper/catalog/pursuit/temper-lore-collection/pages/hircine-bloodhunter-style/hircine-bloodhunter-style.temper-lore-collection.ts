import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const hircineBloodhunterStyle = {
  id: "01a0d5f0-a964-75d0-b1dc-834b965c3ae2",
  type: "page-type/temper-lore-collection",
  slug: "hircine-bloodhunter-style",
  title: "Hircine Bloodhunter Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 113,
  esoLoreCollectionId: 221,
  loreCollectionDescription:
    "These book fragments enable crafting in the Hircine Bloodhunter style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
