import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const westWealdLegionStyle = {
  id: "01a0d5f0-7ed8-72d3-bf5a-795c56546155",
  type: "page-type/temper-lore-collection",
  slug: "west-weald-legion-style",
  title: "West Weald Legion Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 111,
  esoLoreCollectionId: 219,
  loreCollectionDescription: "These book fragments enable crafting in the West Weald Legion style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
