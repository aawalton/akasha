import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const blackreachVanguardStyle = {
  id: "01a0d5ec-ad97-7b1e-bff1-bb0718e39651",
  type: "page-type/temper-lore-collection",
  slug: "blackreach-vanguard-style",
  title: "Blackreach Vanguard Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 69,
  esoLoreCollectionId: 163,
  loreCollectionDescription:
    "These book fragments enable crafting in the Blackreach Vanguard style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
